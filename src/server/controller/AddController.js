const { dbInstance } = require('../DB/BazaTransakcij');
const { getUserById } = require('./ProfileController');

const addAdd = async (req, res) => {
  const add = { ...req.body };
  const user = await getUserById(res.locals.userId);
  var casZacetka = changeFormat(add.startDate);
  var casKonca = changeFormat(add.endDate);

  if (!user) {
    res.status(400).json({ message: 'User not found' });
  }
  const { ID_uporabnik, Tip } = user;

  const overflow = await canAddNew(user);

  if (!overflow) {
    return res.status(400).json({ message: 'User has max number of adds' });
  }

  const normalisedAddForDb = {
    ID_uporabnik,
    Tip,
    Lokacija_lat: '',
    casZacetka,
    casKonca,
    JeAktiven: 1,
    Lokacija_lng: '',
    Lokacija: add.lokacija,
  };

  const addId = await dbInstance.transaction(async (trx) => {
    try {
      const addId = await trx('OGLAS').insert(normalisedAddForDb);
      const id = addId[0];
      /**  Add breed specific information to add */
      const normalisedAddBreedForDb = {
        ID_oglas: id,
        ID_uporabnik,
        Tip,
        ID_pasma: add.pasma,
      };

      await trx('OGLAS_PASME').insert(normalisedAddBreedForDb);
      return id;
    } catch (err) {
      trx.rollback();
    }
  });
  if (!addId) return res.status(400).json({ message: 'error' });
  else return res.status(200).json({ message: 'add added' });
};

const canAddNew = async (user) => {
  const num = await dbInstance
    .count('OGLAS.ID_oglas', { as: 'num' })
    .from('OGLAS')
    .where('OGLAS.JeAktiven', 1)
    .where('OGLAS.ID_uporabnik', user.ID_uporabnik);

  if (user.Tip == 0) {
    if (num[0].num < 99) {
      return true;
    } else {
      return false;
    }
  } else {
    if (num[0].num < 5) {
      return true;
    } else {
      return false;
    }
  }
};

const checkIfUsersAd = async (AdId, userId) => {
  const ad = await dbInstance('OGLAS')
    .where({ ID_uporabnik: userId, ID_oglas: AdId })
    .select('ID_oglas');
  return ad.length ?? false;
};

const getUserAds = async (userId) => {
  const ads = await dbInstance('OGLAS')
    .select(
      'OGLAS.lokacija',
      'OGLAS.CasZacetka',
      'OGLAS.CasKonca',
      'OGLAS.ID_oglas'
    )
    .where('OGLAS.ID_uporabnik', userId)
    .andWhere('OGLAS.JeAktiven', 1);
  return ads;
};

const myAdsAction = async (req, res) => {
  const userId = res.locals.userId;
  try {
    const ads = await getUserAds(userId);
    return res.status(200).json(ads);
  } catch (e) {
    return res.status(400).json({ message: 'Error when fetching ads' });
  }
};

const deleteAd = async (AdId) => {
  await dbInstance('OGLAS_PASME').where('ID_oglas', AdId).del();
  const delRows = await dbInstance('OGLAS').where('ID_oglas', AdId).del();
  return delRows;
};

const deleteAdAction = async (req, res) => {
  const userId = res.locals.userId;
  const { AdId } = req.body;
  try {
    const isRightOwner = await checkIfUsersAd(AdId, userId);
    if (!isRightOwner) {
      return res
        .status(400)
        .json({ message: 'You can only delete Ads you own!' });
    }

    const delRows = await deleteAd(AdId);
    if (delRows > 0) {
      return res.status(200).json({ message: 'Succesfully deleted Ad' });
    }

    return res.status(204).json({ message: 'No Ads were deleted ??' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'Error when deleting Ad' });
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
  addAdd,
  myAdsAction,
  deleteAdAction,
};
