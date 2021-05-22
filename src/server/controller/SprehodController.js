const { dbInstance } = require('../DB/BazaTransakcij');
const { getUserType } = require('./ProfileController');

const sendWalkRequest = async (req, res) => {
  const body = { ...req.body };
  var idOglasa = body.IDoglasa;
  var idLastnika = res.locals.userId;

  if(await requestSentAlready(idOglasa, idLastnika) == 1){
    return res.status(400).json({ message: "Request already sent to walker" });
  }

  var idSprehajalca = await getIDsprehajalca(idOglasa)
  var idPsa = await getIDpsa(idLastnika)
  var tipSprehajalca = await getTipSprehajalca(idSprehajalca)
  var tipLastnika = await getTipLastnika(idLastnika)

  if(idSprehajalca == -1 || idPsa == -1 || tipSprehajalca == -1 || tipLastnika == -1) {
    return res.status(400).json({ message: "Something went wrong..." });
  }

  var datum = new Date()
  datum = changeFormat(datum.toISOString())

  const normalisedSprehodForDb = {
    ID_Pes: idPsa,
    ID_sprehajalec: idSprehajalca,
    ID_lastnik: idLastnika,
    ID_Oglas: idOglasa,
    Tip_sprehajalec: tipSprehajalca,
    Tip_lastnik: tipLastnika,
    DatumKreiranja: datum,
    novaSpremembaSprehajalec: '1',
    novaSpremembaLastnik: '1',
    Priljubljen: '0'
  };

  try {
    await dbInstance('SPREHOD').insert(normalisedSprehodForDb);
    return res.status(200).json({ message: 'Request sent' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}

const walkResponse = async (req, res) => {
  const body = { ...req.body };
  //const userId = res.locals.userId;
  const userId = 71;
  var idSprehoda = body.ID_sprehod;
  var response = body.response;
  
  var datum = new Date()
  datum = changeFormat(datum.toISOString())

  const isRightOwner = await checkIfUsersWalk(idSprehoda, userId);
  if(!isRightOwner){
    return res.status(400).json({ message: 'You can only respond to walk requests sent to you!' });
  }

  //user accpeted walk request
  if(response){
    return acceptWalkRequest(idSprehoda, datum, res);
  }
  //user declined walk request
  else {
    return declineWalkRequest(idSprehoda, datum, res);
  }
}

const walkNotifications = async (req, res) => {
  const userId = res.locals.userId;
  const tip = await getUserType(userId)

  try {
    const walks = await dbInstance('SPREHOD').where('ID_sprehajalec', userId).orWhere('ID_lastnik', userId);
    
    for(walk of walks) {
      console.log(walk)
      if(tip.Tip == 1){
        const updatedWalk = {
          ...walk,
          novaSpremembaSprehajalec: 0,
        }
        await updateWalk(updatedWalk);
      }
      else {
        const updatedWalk = {
          ...walk,
          novaSpremembaLastnik: 0,
        }
        await updateWalk(updatedWalk);
      }
    }
    return res.status(200).json({ message: 'Success' });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Error' });
  }
}

async function acceptWalkRequest(idSprehoda, datum, res){
  try {
    const walk = await getWalkByID(idSprehoda)
  
    const updatedWalk = {
      ...walk,
      Status: 1,
      novaSpremembaLastnik: '1',
      CasOdziva: datum 
    }

    await updateWalk(updatedWalk)
    res.status(200).json({ message: 'Walk request accepted!' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error when accepting walk request' });
  }
}

async function declineWalkRequest(idSprehoda, datum, res){
  try {
    const walk = await getWalkByID(idSprehoda)
  
    const updatedWalk = {
      ...walk,
      Status: 0,
      novaSpremembaLastnik: '1',
      CasOdziva: datum 
    }

    await updateWalk(updatedWalk)
    res.status(200).json({ message: 'Walk request declined!' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error when declining walk request' });
  }
}

async function updateWalk(walk){
  try {
    await dbInstance('SPREHOD').where('ID_sprehod', walk.ID_sprehod).update(walk);
  }
  catch(e) {
    console.log(e);
    throw new Error();
  }
}

async function getWalkByID(id) {
  try {
    const walk = await dbInstance('SPREHOD').where('ID_sprehod', id);

    return walk[0];
  } catch (error) {
    return -1;
  }
}

async function checkIfUsersWalk(walkId, userId) {
  const walk = await dbInstance('SPREHOD')
    .where({ ID_sprehajalec: userId, ID_sprehod: walkId })
    .select('ID_sprehod');

  return walk.length ?? false;
};


async function requestSentAlready(idOglasa, idLastnika) {
  try {
    const exists = await dbInstance('SPREHOD')
      .where({
        ID_oglas: idOglasa,
        ID_lastnik: idLastnika,
      })
      .select('ID_lastnik');

      //if we get ID from query, request was created already
      if(exists[0].ID_lastnik > 0)
        return 1;
      else
        return -1; 
  } catch (error) {
    return -1;
  }
}

async function getIDsprehajalca(idOglasa)  {
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

function changeFormat(time) {
    var datetime = time.split('T');
    var date = datetime[0];
    var temp = datetime[1].split('.');
    var time = temp[0];
  
    return date + ' ' + time;
  }

module.exports = {
    sendWalkRequest,
    walkResponse,
    walkNotifications
  };
  