const axios = require('axios');
const { getPasmeCache, setPasmeCache } = require('./Predpomnilnik');
require('dotenv').config();

const Url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.DogsAPIKEY}`;

const formatPasme = async (breeds) => {
  var retBreeds = new Array();
  var breeds = breeds.data;
  for (i in breeds) {
    var breed = {};
    breed.ID_pasma = breeds[i].id;
    breed.Pasma_ime = breeds[i].name;
    breed.Temperament = breeds[i].temperament;
    breed.Visina = breeds[i].height.metric;
    breed.Teza = breeds[i].weight.metric;
    retBreeds.push(breed);
  }
  return retBreeds;
};

const getPasmeFromAPI = async () => {
  const breeds = await axios.get(Url);
  if (!breeds) return false;
  const ret = await formatPasme(breeds);
  return ret;
};

const getPasme = async (req, res) => {
  try {
    var breeds = await getPasmeCache();
    if (!breeds) {
      breeds = await getPasmeFromAPI();
    }

    if (!breeds) {
      res.status(400).json({ message: 'Failed to retrieve breeds!' });
    }
    setPasmeCache(breeds);
    res.status(200).json({ pasme: breeds });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

const getPasmaByID = async (ID_pasma) => {
  try {
    var breeds = await getPasmeCache();
    if (!breeds) {
      breeds = await getPasmeFromAPI();
    }

    if (!breeds) {
      return false;
    }
    setPasmeCache(breeds);
    var breed;

    if (breeds[ID_pasma].ID_pasma == ID_pasma) {
      breed = breeds[ID_pasma];
    } else {
      for (i in breeds) {
        if (breeds[i].ID_pasma == ID_pasma) {
          breed = breeds[i];
          break;
        }
      }
    }
    return breed;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const addPasmaToDog = async (dogs) => {
  try {
    for (i in dogs) {
      const breed = await getPasmaByID(dogs[0].ID_pasma);
      
      dogs[i].Pasma_ime = breed.Pasma_ime;
      dogs[i].Temperament = breed.Temperament;
      dogs[i].Visina = breed.Visina;
      dogs[i].Teza = breed.Teza;
    }
    return dogs;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getPasme,
  getPasmaByID,
  addPasmaToDog
};
