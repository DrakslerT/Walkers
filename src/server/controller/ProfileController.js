const { dbInstance } = require('../DB/BazaTransakcij');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
  const SALT = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, SALT);
};

const checkPassword = async (password, usersPass) => {
  return (correctPassword = await bcrypt.compare(password, usersPass));
};

/** 
OdzivniČasEnum	Omejitev	        Vrednost
'Dnevno'	    OdzivniČas < 1 Dan	   7
'TriDnevno'	    OdzivniČas < 3 Dni	 5
'Tedensko'	    OdzivniČas < 7 Dni	 3
'VečKotTeden'	OdzivniČas > 7 Dni	   1
*/

const createProfile = async (user) => {
  const normalisedUserForDb = {
    Ime_uporabnik: user.name,
    Geslo: user.password,
    Email: user.email,
    GSM: user.gsm,
    Aktiviran: user.activated,
    DatumUstvaritve: user.added,
    DatumSpremembe: user.updated,
    DatumDeaktivacije: user.deleted,
    Tip: user.type,
  };
  // If not walker
  if (user.type !== 1) {
    try {
      const user = await dbInstance('UPORABNIK').insert(normalisedUserForDb);
      return user.length ? user[0] : false;
    } catch (e) {
      console.error(e);
      return false;
    }
  } else {
    const userId = await dbInstance.transaction(async (trx) => {
      try {
        const user = await trx('UPORABNIK').insert(normalisedUserForDb);
        const id = user[0];

        /**  Add walker specific information to user */
        const normalisedWalkerForDb = {
          ID_uporabnik: id,
          Tip: 1,
          odzivniCas: 7,
          PovprecnaOcena: 0,
          Index: 0,
          StSprehodov: 0,
        };
        await trx('SPREHAJALEC').insert(normalisedWalkerForDb);
        return user[0];
      } catch (err) {
        trx.rollback();
      }
    });
    return userId;
  }
};

const updateProfile = async (user) => {
  try {
    await dbInstance('UPORABNIK')
      .where('ID_uporabnik', user.ID_uporabnik)
      .update(user);
  } catch (e) {
    console.log(e);
    throw new Error();
  }
};

const getUserById = async (userId) => {
  const user = await dbInstance
    .select()
    .from('UPORABNIK')
    .where('ID_uporabnik', userId);
  return user.length ? user[0] : false;
};

const getUserByEmail = async (email) => {
  const user = await dbInstance
    .select()
    .from('UPORABNIK')
    .where('Email', email);
  return user.length ? user[0] : false;
};

const checkIfEmailAvailable = async (email) => {
  const user = await getUserByEmail(email);
  return user ? false : true;
};

const addDog = async (req, res) => {
  const dog = { ...req.body };
  const user = await getUserById(res.locals.userId);

  if (!user) {
    res.status(400).json({ message: 'User not found' });
  }

  const { ID_uporabnik, Tip } = user;

  const normalisedDogForDb = {
    ID_uporabnik,
    Tip,
    Ime_pes: dog.name,
    Opis_pes: null,
    Spol: dog.gender,
    ID_pasma: dog.breed,
  };

  try {
    await dbInstance('PES').insert(normalisedDogForDb);
    return res.status(200).json({ message: 'Dog added' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const getDogsCountByProfile = async (req, res) => {
  const userId = res.locals.userId;
  const dogs = await dbInstance('PES')
    .countDistinct('ID_PES as dogsCount')
    .where('ID_uporabnik', userId);
  res.status(200).json(dogs[0]);
};

const getOwnerDogs = async (userId) => {
  const dogs = await dbInstance('PES')
    .join('PASMA', 'PES.ID_pasma', '=', 'PASMA.ID_pasma')
    .select(
      'PES.ID_pes',
      'PES.Ime_pes',
      'PES.Spol',
      'PES.Opis_pes',
      'PASMA.Pasma_ime',
      'PASMA.Temperament',
      'PASMA.WikiPasmeUrl',
      'PASMA.Visina',
      'PASMA.Teza'
    )
    .where('PES.ID_uporabnik', userId)
    .andWhere('PES.JeIzbrisan', 0); // Only get not deleted dogs
  return dogs;
};

const getWalkerStats = async (userId) => {
  const stats = await dbInstance
    .select('OdzivniCas', 'PovprecnaOcena', 'StSprehodov')
    .from('SPREHAJALEC')
    .where('ID_uporabnik', userId);
  return stats[0];
};

const getProfileAction = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await getUserById(userId);
    let profile = user;
    if (user.Tip === 1) {
      // walker
      const stats = await getWalkerStats(userId);
      profile = { ...profile, stats, dogs: [] };
    } else if (user.Tip === 2) {
      // owner
      const dogs = await getOwnerDogs(userId);
      profile = {
        ...profile,
        dogs,
        stats: { OdzivniCas: 0, PovprecnaOcena: 0, StSprehodov: 0 },
      };
    }

    return res.status(200).json(profile);
  } catch (e) {
    return res.status(400).json({ message: 'Error when fetching profile' });
  }
};

const checkIfRightOwner = async (userID, dogID) => {
  const dog = await dbInstance('PES')
    .where({
      ID_pes: dogID,
      ID_uporabnik: userID,
    })
    .select('ID_pes');
  return dog.length ?? false;
};

const getDogById = async (dogID) => {
  const dog = await dbInstance.select().from('PES').where('ID_pes', dogID);
  return dog.length ? dog[0] : false;
};

const updateDog = async (dog) => {
  try {
    await dbInstance('PES').where('ID_pes', dog.ID_pes).update(dog);
  } catch (e) {
    console.log(e);
    throw new Error();
  }
};

/** Hard deletes a dog from the db. Return a number of deleted rows */
const deleteDog = async (dogID) => {
  const delRows = await dbInstance('PES').where('ID_PES', dogID).del();
  return delRows;
};

const softDeleteDog = async (dogId) => {
  try {
    const dog = await getDogById(dogId);
    const updatedDog = { ...dog, JeIzbrisan: true };
    await updateDog(updatedDog);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const deleteDogAction = async (req, res) => {
  try {
    const userID = res.locals.userId;
    const { dogId } = req.body;
    const isUsersDogs = await checkIfRightOwner(userID, dogId);

    if (!isUsersDogs) {
      return res
        .status(400)
        .json({ message: 'You can only delete dogs you own!' });
    }

    const deleted = await softDeleteDog(dogId);
    if (deleted) {
      return res.status(200).json({ message: 'Delete action sucessfull' });
    }

    return res
      .status(500)
      .json({ message: 'Something went wrong when deleting dog' });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: 'Something went wrong when deleting dog' });
  }
};

const updateProfileAction = async (req, res) => {
  const { name, email, GSM } = req.body;
  const normalisedGSM = '' !== GSM ? GSM : null;
  const userId = res.locals.userId;
  try {
    const user = await getUserById(userId);
    const updatedUser = {
      ...user,
      Ime_uporabnik: name,
      Email: email,
      GSM: normalisedGSM,
    };
    await updateProfile(updatedUser);

    return res.status(200).json({ message: 'Sucessfully updated profile' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error when updating' });
  }
};

const updatePasswordAction = async (req, res) => {
  const userId = res.locals.userId;
  const user = await getUserById(userId);
  const { oldPassword, newPassword } = req.body;
  const correctPassword = await checkPassword(oldPassword, user.Geslo);

  if (!correctPassword) {
    return res
      .status(400)
      .json({ message: 'Given old password does not match users password' });
  }
  try {
    const hashedNew = await hashPassword(newPassword);
    const updatedUser = { ...user, Geslo: hashedNew };
    await updateProfile(updatedUser);
    return res.status(200).json({ message: 'Sucessfully updated password' });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: 'Something went wrong when changing password' });
  }
};

module.exports = {
  checkPassword,
  hashPassword,
  addDog,
  createProfile,
  getUserById,
  updateProfile,
  getUserByEmail,
  checkIfEmailAvailable,
  getDogsCountByProfile,
  getProfileAction,
  deleteDogAction,
  updateProfileAction,
  updatePasswordAction,
};
