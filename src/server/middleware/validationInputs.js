const { body, validationResult } = require('express-validator');

/** Validation rules */

const registerValidationRules = () => {
  return [
    body('name').isAlphanumeric().bail(),
    body('email').isEmail().bail(),
    body('password').isLength({ min: 5 }).bail(),
    body('gsm').trim(' ').optional(),
    body('userType').replace('walker', 1).replace('owner', 2).isInt(),
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
  confirmEmailValidationRules,
  registerValidationRules,
  validateInputs,
  addDogRules,
};
