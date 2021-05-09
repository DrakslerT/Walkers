const { dbInstance } = require('../DB/BazaTransakcij');

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

module.exports = {
  addDog,
  createProfile,
  getUserById,
  updateProfile,
  getUserByEmail,
  checkIfEmailAvailable,
};
