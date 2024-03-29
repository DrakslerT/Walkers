const { body } = require('express-validator');
const { dbInstance } = require('../DB/BazaTransakcij');
const { getPasmaByID, addPasmaToDog } = require('./PasmeFasada');
const {
  getUserType,
  updateProfileAfterWalkRequestResposne,
  getUserById,
} = require('./ProfileController');

const sendWalkRequest = async (req, res) => {
  const body = { ...req.body };
  //console.log(req.body);
  var idOglasa = body.IDoglasa;
  var idPsa = body.dogId;
  var idLastnika = res.locals.userId;
  //console.log(idOglasa);
  //console.log(body);
  if ((await requestSentAlready(idOglasa, idLastnika)) == 1) {
    return res.status(400).json({ message: 'Request already sent to walker' });
  }

  var idSprehajalca = await getIDsprehajalca(idOglasa);
  var tipSprehajalca = await getTipSprehajalca(idSprehajalca);
  var tipLastnika = await getTipLastnika(idLastnika);

  if (idSprehajalca == -1 || tipSprehajalca == -1 || tipLastnika == -1) {
    return res.status(400).json({ message: 'Something went wrong...' });
  }

  var datum = new Date();
  datum = changeFormat(datum.toISOString());

  const normalisedSprehodForDb = {
    ID_Pes: idPsa,
    ID_sprehajalec: idSprehajalca,
    ID_lastnik: idLastnika,
    ID_Oglas: idOglasa,
    DatumKreiranja: datum,
    novaSpremembaSprehajalec: '1',
    novaSpremembaLastnik: '1',
    Priljubljen: '0',
  };
  //console.log(normalisedSprehodForDb);
  try {
    const rez = await dbInstance('SPREHOD').insert(normalisedSprehodForDb);
    //console.log("DOBIJAM->"+rez);
    return res
      .status(200)
      .json({
        message: 'Request sent',
        sprehodid: rez,
        sprehajalecid: idSprehajalca,
      });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const walkResponse = async (req, res) => {
  //console.log(req.body);
  const { idSprehoda, response } = req.body;
  const userId = res.locals.userId;

  var datum = new Date();
  datum = changeFormat(datum.toISOString());
  const isRightOwner = await checkIfUsersWalk(idSprehoda, userId);
  if (!isRightOwner) {
    return res
      .status(400)
      .json({ message: 'You can only respond to walk requests sent to you!' });
  }

  //user accpeted walk request
  if (response) {
    return acceptWalkRequest(idSprehoda, datum, res);
  }
  //user declined walk request
  else {
    return declineWalkRequest(idSprehoda, datum, res);
  }
};

const walkNotifications = async (req, res) => {
  const userId = res.locals.userId;
  const tip = await getUserType(userId);

  try {
    const walks = await dbInstance('SPREHOD')
      .where('ID_sprehajalec', userId)
      .orWhere('ID_lastnik', userId);

    for (walk of walks) {
      if (tip.Tip == 1) {
        const updatedWalk = {
          ...walk,
          novaSpremembaSprehajalec: 0,
        };
        await updateWalk(updatedWalk);
      } else {
        const updatedWalk = {
          ...walk,
          novaSpremembaLastnik: 0,
        };
        await updateWalk(updatedWalk);
      }
    }
    return res.status(200).json({ message: 'Success' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error' });
  }
};

async function acceptWalkRequest(idSprehoda, datum, res) {
  try {
    const walk = await getWalkByID(idSprehoda);

    const updatedWalk = {
      ...walk,
      Status: 1,
      novaSpremembaLastnik: '1',
      CasOdziva: datum,
    };

    await updateWalk(updatedWalk);
    var success = await updateProfileAfterWalkRequestResposne(
      updatedWalk.ID_sprehajalec,
      true
    );
    if (success) res.status(200).json({ message: 'Walk request accepted!' });
    else res.status(400).json({ message: 'Error when accepting walk request' });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: 'Error when accepting walk request' });
  }
}

async function declineWalkRequest(idSprehoda, datum, res) {
  try {
    const walk = await getWalkByID(idSprehoda);

    const updatedWalk = {
      ...walk,
      Status: 0,
      novaSpremembaLastnik: '1',
      CasOdziva: datum,
    };

    await updateWalk(updatedWalk);
    var success = await updateProfileAfterWalkRequestResposne(
      updatedWalk.ID_sprehajalec,
      false
    );
    if (success) res.status(200).json({ message: 'Walk request declined!' });
    else res.status(400).json({ message: 'Error when declining walk request' });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: 'Error when declining walk request' });
  }
}

async function updateWalk(walk) {
  try {
    await dbInstance('SPREHOD')
      .where('ID_sprehod', walk.ID_sprehod)
      .update(walk);
  } catch (e) {
    console.log(e);
    throw new Error();
  }
}

async function getUserByWalkID(id) {
  try {
    const walk = await dbInstance('SPREHOD').where('ID_sprehod', id);
    return walk.length ? walk[0].ID_sprehajalec : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function checkIfUsersWalk(walkId, userId) {
  const walk = await dbInstance('SPREHOD')
    .where({ ID_sprehajalec: userId, ID_sprehod: walkId })
    .select('ID_sprehod');

  return walk.length > false;
}

async function requestSentAlready(idOglasa, idLastnika) {
  try {
    const exists = await dbInstance('SPREHOD')
      .where({
        ID_oglas: idOglasa,
        ID_lastnik: idLastnika,
      })
      .select('ID_lastnik');

    //if we get ID from query, request was created already
    if (exists[0].ID_lastnik > 0) return 1;
    else return -1;
  } catch (error) {
    return -1;
  }
}

async function getIDsprehajalca(idOglasa) {
  try {
    const idSprehajalca = await dbInstance
      .select('OGLAS.ID_uporabnik')
      .from('OGLAS')
      .where('OGLAS.ID_oglas', idOglasa);

    return idSprehajalca[0].ID_uporabnik;
  } catch (error) {
    return -1;
  }
}

async function getTipSprehajalca(idSprehajalec) {
  try {
    const tipSprehajalca = await dbInstance
      .select('UPORABNIK.Tip')
      .from('UPORABNIK')
      .where('UPORABNIK.ID_uporabnik', idSprehajalec);

    return tipSprehajalca[0].Tip;
  } catch (error) {
    return -1;
  }
}

async function getTipLastnika(idLastnika) {
  try {
    const tipLastnika = await dbInstance
      .select('UPORABNIK.Tip')
      .from('UPORABNIK')
      .where('UPORABNIK.ID_uporabnik', idLastnika);

    return tipLastnika[0].Tip;
  } catch (error) {
    return -1;
  }
}

const getUsersWalks = async (userId) => {
  const walks = await dbInstance
    .select(
      'spr.ID_sprehod',
      'spr.Status',
      'spr.DatumKreiranja',
      'spr.novaSpremembaLastnik',
      'spr.novaSpremembaSprehajalec',
      'spr.Priljubljen',
      'spr.rated',
      'ogl.Lokacija',
      'ogl.CasZacetka',
      'ogl.CasKonca',
      'pes.Ime_pes',
      'pes.ID_pasma',
      'last.Ime_uporabnik as lastnik',
      'last.Email as last_email',
      'last.GSM as last_GSM',
      'spreh.Ime_uporabnik as sprehajalec',
      'spreh.Email as spreh_email',
      'spreh.GSM as spreh_GSM',
      'spreh.ID_uporabnik as spreh_id',
      'sprehStats.StSprehodov',
      'sprehStats.OdzivniCas',
      'sprehStats.PovprecnaOcena'
    )
    .from('SPREHOD as spr')
    .leftJoin('OGLAS as ogl', 'ogl.ID_oglas', 'spr.ID_oglas')
    .leftJoin('PES as pes', 'pes.ID_pes', 'spr.ID_pes')
    .leftJoin('UPORABNIK as last', 'last.ID_uporabnik', 'spr.ID_lastnik')
    .leftJoin('UPORABNIK as spreh', 'spreh.ID_uporabnik', 'spr.ID_sprehajalec')
    .leftJoin(
      'SPREHAJALEC as sprehStats',
      'sprehStats.ID_uporabnik',
      'spr.ID_sprehajalec'
    )
    .where('spr.ID_sprehajalec', userId)
    .orWhere('spr.ID_lastnik', userId)
    .orderBy([
      { column: 'spr.Status' },
      { column: 'ogl.CasZacetka', order: 'desc' },
    ]);

  const walkList = await addPasmaToDog(walks);
  return walkList;
};

const getWalksAction = async (req, res) => {
  const userId = res.locals.userId;
  try {
    const walks = await getUsersWalks(userId);
    return res.status(200).json(walks);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error fetching walks' });
  }
};

const getNotifications = async (userId) => {
  const userType = await getUserType(userId);
  let notifications;
  if (userType === 1 || userType === 4) {
    notifications = await dbInstance('SPREHOD')
      .countDistinct('ID_sprehod as notifications')
      .where('ID_sprehajalec', userId)
      .andWhere('novaSpremembaSprehajalec', 1);
  } else {
    notifications = await dbInstance('SPREHOD')
      .countDistinct('ID_sprehod as notifications')
      .where('ID_lastnik', userId)
      .andWhere('novaSpremembaLastnik', 1);
  }
  // Return count if exists else 0
  return notifications.length ? notifications[0]['notifications'] : 0;
};

const addFavourite = async (req, res) => {
  const { idSprehoda, response } = req.body;

  const walk = await dbInstance('SPREHOD').where('ID_sprehod', idSprehoda);

  const updatedWalk = {
    ...walk[0],
    Priljubljen: response,
  };

  try {
    await dbInstance('SPREHOD')
      .where('ID_sprehod', idSprehoda)
      .update(updatedWalk);
    return res.status(200).json({ message: 'Added to favourites.' });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: 'Error when adding to favourites.' });
  }
};

function changeFormat(time) {
  var datetime = time.split('T');
  var date = datetime[0];
  var temp = datetime[1].split('.');
  var time = temp[0];

  return date + ' ' + time;
}

const addReport = async (req, res) => {
  const body = req.body;
  const userID = await getUserByWalkID(body.walkId);
  if (!userID) {
    return res.status(400).json({ message: 'UserID not found' });
  }
  const user = await getUserById(userID);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const { ID_uporabnik, Tip } = user;
  const normalisedAddForDb = {
    ID_uporabnik,
    Vsebina: body.description,
  };

  const reportId = await dbInstance.transaction(async (trx) => {
    try {
      const reportId = await trx('KRSITEV').insert(normalisedAddForDb);
      const id = reportId[0];
      return id;
    } catch (err) {
      trx.rollback();
    }
  });

  if (!reportId) return res.status(400).json({ message: 'error' });
  else return res.status(200).json({ message: 'Report added' });
};

module.exports = {
  sendWalkRequest,
  acceptWalkRequest,
  getWalksAction,
  sendWalkRequest,
  walkResponse,
  walkNotifications,
  getNotifications,
  addFavourite,
  getUserByWalkID,
  addReport,
};
