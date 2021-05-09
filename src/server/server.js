//proba
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {
  registerUser,
  validateUser,
  refreshToken,
  activateUser,
  loginUser,
} = require('./controller/AuthController');
const { addDog } = require('./controller/ProfileController');
const dotenv = require('dotenv');
const { testConnection } = require('./DB/BazaTransakcij');
const {
  validateInputs,
  registerValidationRules,
  addDogRules,
  confirmEmailValidationRules,
  loginValidationRules,
} = require('./middleware/validationInputs');
const { getOglasi } = require('./controller/OglasController');
const { addAdd } = require('./controller/AddController');

const app = express();
app.set('trust proxy', 1);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const clientOrigin =
  process.env.NODE_ENV == 'production'
    ? 'ProdClientURL'
    : 'http://localhost:3000';

app.use(cors({ credentials: true, origin: clientOrigin }));
app.use(morgan('dev'));
app.use(helmet());
dotenv.config();

/** Server endpoints */

// Auth routes
app.post(
  '/api/register',
  registerValidationRules(),
  validateInputs,
  (req, res) => registerUser(req, res)
);
app.post('/api/refresh_token', (req, res) => refreshToken(req, res));
app.post(
  '/api/activate_user',
  confirmEmailValidationRules(),
  validateInputs,
  validateUser,
  (req, res) => activateUser(req, res)
);
app.post('/api/login', loginValidationRules(), validateInputs, (req, res) =>
  loginUser(req, res)
);

// Profile routes
// app.get('api/dogs')
// app.get('api/dogs/:id')
app.post(
  '/api/dogs/add',
  addDogRules(),
  validateInputs,
  validateUser,
  (req, res) => addDog(req, res)
);


// Oglas routes
app.get('/api/oglas/getOglasi', validateUser, (req, res) => getOglasi(req, res));

//Add add
app.post('/api/addAdd', validateUser, (req, res) => addAdd(req, res));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
  /** If you want to test your DB connection uncomment this */
  //testConnection()
});

/** Export for testing */
module.exports = app;
