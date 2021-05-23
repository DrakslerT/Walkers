const { dbInstance } = require('../DB/BazaTransakcij');
const {
  getUserType,
  getUserById,
  updateProfile,
} = require('./ProfileController');

const checkIfAdmin = async (userId) => {
  const userType = await getUserType(userId);
  return userType['Tip'] === 3; // Admin type
};

const AdminUsersListAction = async (req, res) => {
  const userId = res.locals.userId;
  const isAdmin = await checkIfAdmin(userId);
  if (!isAdmin) {
    return res.status(401).json({ message: 'Not admin' });
  }

  const users = await dbInstance('UPORABNIK');
  return res.status(200).json(users);
};

const AdminDeactivateAction = async (req, res) => {
  const userId = res.locals.userId;
  const isAdmin = await checkIfAdmin(userId);
  if (!isAdmin) {
    return res.status(401).json({ message: 'Not admin' });
  }
  try {
    const { profileId } = req.body;
    const user = await getUserById(profileId);
    const updatedUser = { ...user, Aktiviran: null };
    await updateProfile(updatedUser);
    return res.status(200).json({ message: 'Success!' });
  } catch (e) {
    return res.status(400).json({ message: 'Error when activating' });
  }
};

module.exports = {
  AdminUsersListAction,
  AdminDeactivateAction,
};
