import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    role: Joi.string().valid("pregnant", "new_parent", "caregiver").required(),
    babyage: Joi.string()
      .valid("Newborn", "1mo", "2mo", "3mo", "4mo", "5mo", "6mo", "9mo", "12mo")
      .required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
    // Allow clients to send either babyAge or babyage
    .rename("babyAge", "babyage", { override: true, ignoreUndefined: true })
    // Prevent failures if clients send extra keys; strip them from the value
    .prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};

export const sendMailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
  }).prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};

export const verifyUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    code: Joi.string().length(6).required(),
  }).prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};

export const forgotPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    code: Joi.string().length(6).required(),
    password: Joi.string().min(6).required(),
  }).prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};
