const { dbInstance } = require('../DB/BazaTransakcij');
const { getUserById } = require('./ProfileController');

const getOglasiWhere = async (user, filter) => {
  try {
    var ret = {
      query: '',
      value: filter.value,
    };

    switch (filter.type) {
      case 0:
        ret.query = "Ime_uporabnik like '%??%'";
        break;
      case 1:
        ret.query = 'ID_pasma IN (?';
        for (var i = 1; i < filter.value.length; i++) {
          ret.query += ', ?';
        }
        ret.query += ')';
        break;
      case 2:
        ret.query = 'OdzivniCas <= ?';
        break;
      case 3:
        ret.query = 'Lokacija = ?';
        break;
      case 4:
        ret.query = 'PovprecnaOcena >= ?';
        break;
      case 5:
        const priljubljeni = await getPriljubljeniUporabniki(user);

        if (priljubljeni) {
          ret.query = 'SPREHAJALEC.ID_uporabnik IN (?';
          for (var i = 1; i < priljubljeni.length; i++) {
            ret.query += ', ?';
          }
          ret.query += ')';
          ret.value = priljubljeni;
        } else {
          ret.query = 'SPREHAJALEC.ID_uporabnik = ?';
          ret.value = -1;
        }

        break;
      case 6:
        ret.query = 'SPREHAJALEC.Tip = ?';
        break;
      default:
    }
    return ret;
  } catch (e) {
    console.log(e);
    throw new Error();
  }
};

const getPriljubljeniUporabniki = async (user) => {
  const favourites = await dbInstance
    .select('SPREHOD.ID_uporabnik')
    .distinct()
    .from({ lastnik: 'UPORABNIK' })
    .innerJoin('PES', 'PES.ID_uporabnik', 'LASTNIK.ID_uporabnik')
    .innerJoin('SPREHOD', 'SPREHOD.ID_pes', 'PES.ID_pes')
    .where('PES.ID_uporabnik', user.ID_uporabnik);
  return favourites.length ? favourites[0] : false;
};
const getOglasi = async (req, res) => {
  try {
    const filters = { ...req.query };
    const user = await getUserById(res.locals.userId);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    }

    var wheres = [];
    for (filter in filters) {
      if (filters[filter] && typeof filters[filter].type != 'undefined') {
        wheres[filter] = await getOglasiWhere(user, filters[filter]);
      }
    }

    const oglasi = await dbInstance
      .select('OGLAS.*', 'SPREHAJALEC.*', 'UPORABNIK.Ime_uporabnik')
      .distinct()
      .from('OGLAS')
      .innerJoin(
        'SPREHAJALEC',
        'SPREHAJALEC.ID_uporabnik',
        'OGLAS.ID_uporabnik'
      )
      .innerJoin(
        'UPORABNIK',
        'UPORABNIK.ID_uporabnik',
        'SPREHAJALEC.ID_uporabnik'
      )
      .innerJoin('OGLAS_PASME', 'OGLAS_PASME.ID_oglas', 'OGLAS.ID_oglas')
      .where(async (qb) => {
        for (where in wheres) {
          if (wheres[where].query != '') {
            qb.whereRaw(wheres[where].query, wheres[where].value);
          }
        }

        if (user.Tip <= 1) {
          qb.whereRaw('OGLAS.ID_uporabnik = ?', user.ID_uporabnik);
        } else {
          console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));
          qb.whereRaw(
            'OGLAS.CasZacetka < ?',
            new Date().toISOString().slice(0, 19).replace('T', ' ')
          );
          qb.whereRaw(
            'OGLAS.CasKonca > ?',
            new Date().toISOString().slice(0, 19).replace('T', ' ')
          );
        }
      })
      .orderBy('SPREHAJALEC.OdzivniCas', 'asc')
      .orderBy('SPREHAJALEC.PovprecnaOcena', 'desc')
      .orderBy('OGLAS.CasZacetka', 'desc');
    console.log(oglasi);
    res.status(200).json({ oglasi: oglasi });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

const getAllOglasi = async (req, res) => {
  const oglasi = await dbInstance('OGLAS');
  return res.status(200).json(oglasi);
};

module.exports = {
  getOglasi,
  getAllOglasi,
};
