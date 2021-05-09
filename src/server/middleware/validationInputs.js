const { body, validationResult } = require('express-validator');
const { checkIfEmailAvailable } = require('../controller/ProfileController');

/** Validation rules */

const registerValidationRules = () => {
  return [
    body('name').isAlphanumeric().bail(),
    body('email')
      .isEmail()
      .custom(async (value) => {
        const available = await checkIfEmailAvailable(value);
        if (!available) {
          return Promise.reject('E-mail already in use');
        }
      })
      .bail(),
    body('password').isLength({ min: 5 }).bail(),
    body('gsm').trim(' ').optional(),
    body('userType')
      .isIn(['walker', 'owner'])
      .replace('walker', 1)
      .replace('owner', 2),
  ];
};

const loginValidationRules = () => {
  return [
    body('email').isEmail().bail(),
    body('password').isLength({ min: 5 }).bail(),
  ];
};

const addDogRules = () => {
  return [
    body('name').isAlpha(),
    body('gender')
      .isIn(['male', 'female'])
      .replace('male', 0)
      .replace('female', 1),
    body('breed').isInt(),
  ];
};

const confirmEmailValidationRules = () => {
  return [body('ActivationCode').isLength(6)];
};

/** Middleware */

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  loginValidationRules,
  confirmEmailValidationRules,
  registerValidationRules,
  validateInputs,
  addDogRules,
};
