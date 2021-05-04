const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { sendCodeEmail } = require('./EmailController');
const {
  createProfile,
  getUserById,
  updateProfile,
  getUserByEmail
} = require('./ProfileController');

const saltRounds = 10;


const registerUser = async (req, res) => {
  const { name, email, password, gsm, userType } = req.body;
  const newGSM = gsm !== '' ? gsm : null;

  const SALT = await bcrypt.genSalt(saltRounds);
  hashedPass = await bcrypt.hash(password, SALT);

  let newUser = {
    name: name,
    email: email,
    password: hashedPass,
    gsm: newGSM,
    activated: false,
    added: new Date(),
    updated: new Date(),
    deleted: null,
    type: userType,
  };

  /** Creates user profile and inserts it to DB */
  const userId = await createProfile(newUser);

  if (!userId) {
    return res.status(400).json({ message: 'Error when registrating' });
  }

  /** User activaction process */
  const ActivationCode = createActivationCode(newUser.name, newUser.added);
  sendCodeEmail(ActivationCode, newUser.email);

  return AuthResponse(res, userId);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
     return res.status(404).json({ message: 'User not found' });
  }

  const correctPassword = await bcrypt.compare(password, user.Geslo)

  if (!correctPassword) {
    return res.status(400).json({message: 'Wrong password'})
  }

  return AuthResponse(res, user.ID_uporabnik);
};

/** Accepts user, generates tokens and responds with accessToken and sets refreshToken cookie    */
const AuthResponse = (res, User) => {
  const accessToken = generateToken(User, process.env.JWT_ACCESS_SECRET, '3h');
  const refreshToken = generateToken(
    User,
    process.env.JWT_REFRESH_SECRET,
    '7d'
  );
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    path: '/api/refresh_token',
  });
  return res.status(200).json({ accessToken });
};

const generateToken = (userId, secret, TTL) => {
  let payload = {
    time: Date(),
    userId,
  };
  return jwt.sign(payload, secret, { expiresIn: TTL });
};

/** Validates if user is authenticated.. returns user id inside res.locals variable or responds 401 */
const validateUser = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send({ message: 'No auth header' });
    }

    const token = authHeader.split(' ')[1];

    const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (verified) {
      res.locals.userId = verified.userId;
      next();
      return;
    }
    return res.status(401).send({ message: 'Access denied' });
  } catch (err) {
    return res.status(401).send(err);
  }
};

const refreshToken = (req, res) => {
  try {
    const refresh_token = req.cookies.jid;
    const verified = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    if (verified) {
      const userId = verified.userId;
      return AuthResponse(res, userId);
    }

    return res.status(401).send({ message: 'Access denied' });
  } catch (e) {
    return res.status(401).send({ message: 'Access denied' });
  }
};

const createActivationCode = (username, creationDate) => {
  const draft = username + creationDate.toString();
  let code = md5(draft);
  code = code.slice(code.length - 7, -1);
  code = code.toUpperCase();
  return code;
};

const resendActivationCode = (req, res) => {
  // TODO
};

const activateUser = async (req, res) => {
  let { ActivationCode } = req.body;
  ActivationCode = ActivationCode.toUpperCase();
  const user = await getUserById(res.locals.userId);
  const code = createActivationCode(user.Ime_uporabnik, user.DatumUstvaritve);

  if (code === ActivationCode) {
    const updatedUser = { ...user, Aktiviran: true };
    try {
      await updateProfile(updatedUser);
      return res.status(200).json({ message: 'Success' });
    } catch (e) {
      return res.status(400).json({ message: 'Error when updating profile' });
    }
  }

  return res.status(400).json({ message: 'Wrong activaction code' });
};

module.exports = {
  registerUser,
  validateUser,
  refreshToken,
  activateUser,
  loginUser,
};
