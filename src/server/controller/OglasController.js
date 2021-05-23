const { dbInstance } = require('../DB/BazaTransakcij');

const getOglasi = async (req, res) => {
  try {
    const filters = { ...req.query };
    //console.log(filters);
    const userId = res.locals.userId;
    //console.log(userId);
    const AdsQuery = dbInstance
      .select(
        'Ad.ID_oglas',
        'Ad.CasKonca',
        'Ad.CasZacetka',
        'Ad.ID_oglas',
        'Ad.Lokacija',
        'u.Ime_uporabnik',
        'spr.OdzivniCas',
        'spr.PovprecnaOcena',
        'spr.StSprehodov'
      )
      .from('OGLAS as Ad')
      .innerJoin('UPORABNIK as u', 'u.ID_uporabnik', 'Ad.ID_uporabnik')
      .innerJoin('SPREHAJALEC as spr', 'spr.ID_uporabnik', 'Ad.ID_uporabnik')
      .innerJoin('OGLAS_PASME as Ad_PASME', 'Ad_PASME.ID_oglas', 'Ad.ID_oglas')
      .where('Ad.CasZacetka', '>=', new Date())
      .orderBy([{ column: 'spr.Index', order: 'desc' }, {column: 'Ad.CasZacetka'}]);

    if (Object.keys(req.query).length !== 0) {
      if (filters.name !== '') {
        AdsQuery.where('u.Ime_uporabnik', 'like', `%${filters.name}%`);
      }

      if (filters.breed !== '') {
        const breedSubQuery = dbInstance('OGLAS_PASME')
          .select('ID_oglas')
          .where('ID_pasma', filters.breed);
        AdsQuery.whereIn('Ad.ID_oglas', breedSubQuery);
      }

      if (filters.location !== '') {
        AdsQuery.where('Ad.Lokacija', 'like', `%${filters.location}%`);
      }

      if (filters.rating !== '') {
        AdsQuery.where('spr.PovprecnaOcena', '>=', filters.rating);
      }

      if (filters.favourites !== '') {
        const favouritesSubQuery = dbInstance('SPREHOD')
          .select('ID_sprehajalec')
          .where('ID_lastnik', userId)
          .andWhere('Priljubljen', 1);
        AdsQuery.whereIn('u.ID_uporabnik', favouritesSubQuery);
      }

      if (filters.experienced !== '') {
        AdsQuery.where('u.Tip', '=', 4); // Where expirienced
      }
    }

    const ads = await AdsQuery;
    res.status(200).json({ oglasi: ads });
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
