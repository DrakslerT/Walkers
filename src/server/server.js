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
} = require('./controller/AuthController');
const { addDog } = require('./controller/ProfileController');
const dotenv = require('dotenv');
const { testConnection } = require('./DB/BazaTransakcij');
const {
  validateInputs,
  registerValidationRules,
  addDogRules,
  confirmEmailValidationRules,
} = require('./middleware/validationInputs');

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
app.post('/api/login', (req, res) => {
  res.json({ message: 'login' });
});

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

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
  /** If you want to test your DB connection uncomment this */
  // testConnection()
});
