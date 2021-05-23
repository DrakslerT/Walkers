const { dbInstance } = require('../DB/BazaTransakcij');
const {
  getUserType,
  updateProfileAfterRating,
} = require('./ProfileController');

const setGrade = async (req, res) => {
  const { walkerId, rating, walkId } = req.body;

  const sprehod = await dbInstance('SPREHOD').where('ID_sprehod', walkId);

  if (sprehod[0].rated == 1)
    return res.status(400).json({ message: 'Walk was rated already' });

  try {
    const tip = await getUserType(walkerId);

    const normalisedGradeForm = {
      ID_uporabnik: walkerId,
      Vrednost: rating,
    };
    await dbInstance('OCENA').insert(normalisedGradeForm);

    const updatedSprehod = {
      ...sprehod[0],
      rated: 1,
    };
    await dbInstance('SPREHOD')
      .where('ID_sprehod', walkId)
      .update(updatedSprehod);

    const success = await updateProfileAfterRating(walkerId);

    if (success) res.status(200).json({ message: 'Rating added!' });
    else res.status(400).json({ message: 'Error when rating a walk' });
  } catch (error) {
    console.log(e);
    return res.status(400).json({ message: 'Error when rating a walk' });
  }
};

module.exports = {
  setGrade,
};
