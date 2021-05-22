const { dbInstance } = require('../DB/BazaTransakcij');
const { getUserById } = require('./ProfileController');

const sendWalkRequest = async (req, res) => {
  const body = { ...req.body };
  var idOglasa = body.IDoglasa;
  var idLastnika = res.locals.userId;

  if ((await requestSentAlready(idOglasa, idLastnika)) == 1) {
    return res.status(400).json({ message: 'Request already sent to walker' });
  }

  var idSprehajalca = await getIDsprehajalca(idOglasa);
  var idPsa = await getIDpsa(idLastnika);
  var tipSprehajalca = await getTipSprehajalca(idSprehajalca);
  var tipLastnika = await getTipLastnika(idLastnika);

  if (
    idSprehajalca == -1 ||
    idPsa == -1 ||
    tipSprehajalca == -1 ||
    tipLastnika == -1
  ) {
    return res.status(400).json({ message: 'Something went wrong...' });
  }

  var datum = new Date();
  datum = changeFormat(datum.toISOString());

  const normalisedSprehodForDb = {
    ID_Pes: idPsa,
    ID_sprehajalec: idSprehajalca,
    ID_lastnik: idLastnika,
    ID_Oglas: idOglasa,
    Tip_sprehajalec: tipSprehajalca,
    Tip_lastnik: tipLastnika,
    Status: '0',
    DatumKreiranja: datum,
    novaSprememba: '1',
    Priljubljen: '0',
  };

  try {
    await dbInstance('SPREHOD').insert(normalisedSprehodForDb);
    return res.status(200).json({ message: 'Request sent' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const acceptWalkRequest = async (req, res) => {};

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

async function getIDpsa(idLastnika) {
  try {
    const idPsa = await dbInstance
      .select('PES.ID_pes')
      .from('PES')
      .where('PES.ID_uporabnik', idLastnika);

    return idPsa[0].ID_pes;
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
      'spr.novaSprememba',
      'spr.Priljubljen',
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
      'sprehStats.StSprehodov',
      'sprehStats.OdzivniCas',
      'sprehStats.PovprecnaOcena',
    )
    .from('SPREHOD as spr')
    .leftJoin('OGLAS as ogl', 'ogl.ID_oglas', 'spr.ID_oglas')
    .leftJoin('PES as pes', 'pes.ID_pes', 'spr.ID_pes')
    .leftJoin('UPORABNIK as last', 'last.ID_uporabnik', 'spr.ID_lastnik')
    .leftJoin('UPORABNIK as spreh', 'spreh.ID_uporabnik', 'spr.ID_sprehajalec')
    .leftJoin('SPREHAJALEC as sprehStats', 'sprehStats.ID_uporabnik', 'spr.ID_sprehajalec')
    .where('spr.ID_sprehajalec', userId)
    .orWhere('spr.ID_lastnik', userId);
  return walks;
};

const getWalksAction = async (req, res) => {
  const userId = res.locals.userId;
  try {
    const walks = await getUsersWalks(userId);
    return res.status(200).json(walks);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error fetching ads' });
  }
};

function changeFormat(time) {
  var datetime = time.split('T');
  var date = datetime[0];
  var temp = datetime[1].split('.');
  var time = temp[0];

  return date + ' ' + time;
}

module.exports = {
  sendWalkRequest,
  acceptWalkRequest,
  getWalksAction,
};
