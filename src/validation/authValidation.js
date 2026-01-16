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
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
