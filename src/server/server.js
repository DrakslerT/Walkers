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
  resendActivationCode,
  logout,
} = require('./controller/AuthController');
const {
  addDog,
  getDogsCountByProfile,
  getProfileAction,
  deleteDogAction,
  updateProfileAction,
  updatePasswordAction,
  getDogsAction,
} = require('./controller/ProfileController');
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
const { getPasme } = require('./controller/PasmeFasada');
const {
  addAdd,
  myAdsAction,
  deleteAdAction,
  updateAdAction,
} = require('./controller/AddController');
const {
  calendarList,
  confirmToken
} = require('./controller/GoogleCalendarFasada');
const {
  getWalksAction,
  sendWalkRequest,
  walkResponse,
  addReport,
  walkNotifications,
  addFavourite,
} = require('./controller/SprehodController');
const { setGrade } = require('./controller/OceneController');
const {
  AdminUsersListAction,
  AdminDeactivateAction,
} = require('./controller/AdminController');

const app = express();
app.set('trust proxy', 1);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const clientOrigin =
  process.env.NODE_ENV == 'production'
    ? 'https://tpo11-dogwalkers.herokuapp.com'
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

app.get('/api/resend_activation', validateUser, (req, res) =>
  resendActivationCode(req, res)
);

app.post('/api/login', loginValidationRules(), validateInputs, (req, res) =>
  loginUser(req, res)
);

app.post('/api/logout', (req, res) => logout(req, res));

// Profile routes
app.get('/api/dogs/count', validateUser, (req, res) =>
  getDogsCountByProfile(req, res)
);

app.get('/api/profile', validateUser, (req, res) => getProfileAction(req, res));
app.put('/api/profile/update', validateUser, (req, res) =>
  updateProfileAction(req, res)
);
app.put('/api/profile/password', validateUser, (req, res) =>
  updatePasswordAction(req, res)
);

// app.get('api/dogs/:id')
app.post(
  '/api/dogs/add',
  addDogRules(),
  validateInputs,
  validateUser,
  (req, res) => addDog(req, res)
);
app.post('/api/dogs/delete', validateUser, (req, res) =>
  deleteDogAction(req, res)
);
app.get('/api/dogs/list', validateUser, (req, res) => getDogsAction(req, res));

// Oglas routes
app.get('/api/oglas/getOglasi', validateUser, (req, res) =>
  getOglasi(req, res)
);

app.get('/api/oglas/me', validateUser, (req, res) => myAdsAction(req, res));
app.post('/api/oglas/delete', validateUser, (req, res) => {
  deleteAdAction(req, res);
});
app.put('/api/oglas/edit', validateUser, (req, res) =>
  updateAdAction(req, res)
);

app.post('/api/addAdd', validateUser, (req, res) => addAdd(req, res));

// Pasme routes
app.get('/api/pasme/getPasme', validateUser, (req, res) => getPasme(req, res));

//sprehod routes
app.get('/api/walks', validateUser, (req, res) => getWalksAction(req, res));
app.post('/api/sendWalkRequest', validateUser, (req, res) =>
  sendWalkRequest(req, res)
);
app.post('/api/walkResponse', validateUser, (req, res) =>
  walkResponse(req, res)
);
app.post('/api/walkNotifications', validateUser, (req, res) =>
  walkNotifications(req, res)
);
app.post('/api/addFavourite', (req, res) =>
  addFavourite(req, res)
);
app.post('/api/addReport', validateUser, (req, res) => 
  addReport(req, res)
);

//ocene routes
app.post('/api/setRating', validateUser, (req, res) => setGrade(req, res));

// AdminPage
app.get('/api/admin/users', validateUser, (req, res) =>
  AdminUsersListAction(req, res)
);
app.post('/api/admin/users/deactivate', validateUser, (req, res) =>
  AdminDeactivateAction(req, res)
);
// Calendar routes
app.post('/api/calendar/addEvent', validateUser, (req, res) => calendarList(req, res));
app.post('/api/calendar/confirm', validateUser, (req, res) => confirmToken(req, res));

//Delete Ad
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
  /** If you want to test your DB connection uncomment this */
  //testConnection()
});

/** Export for testing */
module.exports = app;
