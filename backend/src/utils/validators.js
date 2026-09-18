const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const schemas = {
  userRegister: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
  }),
  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  prayerRequest: Joi.object({
    name: Joi.string().max(150).allow('', null),
    request: Joi.string().min(1).required(),
  }),
  testimony: Joi.object({
    name: Joi.string().max(150).allow('', null),
    title: Joi.string().min(1).max(255).required(),
    story: Joi.string().min(1).required(),
  }),
};

module.exports = { validate, schemas };
