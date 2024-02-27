import Joi from 'joi';

// User validation schema
const userSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`
  }),
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.email': `"email" must be a valid email address`,
    'string.empty': `"email" cannot be an empty field`,
    'any.required': `"email" is a required field`
  }),
  agent: Joi.string().allow(null, '').messages({
    'string.base': `"agent" should be a type of 'text'`,
    'string.empty': `"agent" cannot be an empty field`
  }),
}).options({ abortEarly: false, allowUnknown: false });

export default userSchema;