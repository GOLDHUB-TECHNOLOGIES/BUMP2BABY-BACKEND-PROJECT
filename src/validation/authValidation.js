import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    role: Joi.string().valid("pregnant", "new_parent", "caregiver").required(),
    trimesters: Joi.when("role", {
      is: "pregnant",
      then: Joi.string()
        .valid("1-13weeks", "14-27weeks", "28-40weeks")
        .required(),
      otherwise: Joi.string()
        .valid("1-13weeks", "14-27weeks", "28-40weeks")
        .optional()
        .allow(null, ""),
    }),
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
    // Allow clients to send either trimesters or trimesters
    .rename("Trimesters", "trimesters", {
      override: true,
      ignoreUndefined: true,
    })
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

export const changePasswordValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  }).prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};

export const updateProfileValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().min(6).email(),
  }).prefs({ abortEarly: false, allowUnknown: true, stripUnknown: true });

  return schema.validate(data);
};
