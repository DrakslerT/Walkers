const { dbInstance } = require('../DB/BazaTransakcij');
const { getUserById } = require('./ProfileController');

const getOglasiWhere = async (user, filter) => {
    try {
        var ret = {
            query: "",
            value: filter.value
        }
        
        switch (filter.type) {
            case 0:
                ret.query = 'Ime_uporabnik like \'%??%\'';
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
                    ret.query = 'sprehajalec.ID_uporabnik IN (?';
                    for (var i = 1; i < priljubljeni.length; i++) {
                        ret.query += ', ?';
                    }
                    ret.query += ')';
                    ret.value = priljubljeni;
                } else {
                    ret.query = 'sprehajalec.ID_uporabnik = ?';
                    ret.value = -1;
                }
                
                break;
            case 6:
                ret.query = 'sprehajalec.Tip = ?';
                break;
            default:
        }
        return ret;
    } catch (e) {
        console.log(e);
        throw new Error();
    }
}

const getPriljubljeniUporabniki = async (user) => {
    const favourites = await dbInstance
        .select('sprehod.ID_uporabnik')
        .distinct()
        .from({ lastnik: 'Uporabnik'})
        .innerJoin('pes', 'pes.ID_uporabnik', 'lastnik.ID_uporabnik')
        .innerJoin('sprehod', 'sprehod.ID_pes', 'pes.ID_pes')
        .where('pes.ID_uporabnik', user.ID_uporabnik);
    return favourites.length ? favourites[0] : false;  
}
const getOglasi = async (req, res) => {
    try {
        const filters = { ...req.body };
        const user = await getUserById(res.locals.userId);
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        }

        var wheres = [];
        for (filter in filters) {
            if ((filters[filter]) && (typeof filters[filter].type != 'undefined')) {
                wheres[filter] = await getOglasiWhere(user, filters[filter]);
            }
        }

        const oglasi = await dbInstance
            .select('oglas.*', 'OdzivniCas')
            .from('oglas')
            .innerJoin('sprehajalec', 'sprehajalec.ID_uporabnik', 'oglas.ID_uporabnik')
            .innerJoin('uporabnik', 'uporabnik.ID_uporabnik', 'sprehajalec.ID_uporabnik')
            .innerJoin('oglas_pasme', 'oglas_pasme.ID_oglas', 'oglas.ID_oglas')
            .where(async (qb) => {
                for (where in wheres) {
                    if (wheres[where].query != "") {
                        qb.whereRaw(wheres[where].query, wheres[where].value);
                    }
                }

                if (user.Tip <= 1) {
                    qb.whereRaw('oglas.ID_uporabnik = ?', user.ID_uporabnik);
                }
            })
            .groupBy('ID_oglas');
            
        res.status(200).json({oglasi: oglasi});
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
}

module.exports = {
    getOglasi
};