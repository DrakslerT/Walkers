const { dbInstance } = require('../DB/BazaTransakcij');
const { getUserById } = require('./ProfileController')

const addAdd = async (req, res) => {
    const add = { ...req.body };
    const user = await getUserById(res.locals.userId);
    
    console.log(add)
    "1000-01-01 00:00:00"

    var casZacetka = changeFormat(add.startDate)
    var casKonca = changeFormat(add.endDate)
    
    console.log(casZacetka)
  
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    }
  
    const { ID_uporabnik, Tip } = user;
    
    const normalisedAddForDb = {
      ID_uporabnik,
      Tip,
      Lokacija: add.lokacija,
      casZacetka,
      casKonca
    };
  
    try {
      await dbInstance('oglas').insert(normalisedAddForDb);
      return res.status(200).json({ message: 'Add added' });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  };

  function changeFormat(time){
    var datetime = time.split("T")
    var date  = datetime[0]
    var temp = datetime[1].split(".")
    var time = temp[0]

    return date + " " + time
  }

  module.exports = {
    addAdd
  };