import Joi from 'joi';

// Agent validation schema
const agentSchema = Joi.object({
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
    role: Joi.string().valid("admin", "regular").required().messages({
        'string.base': `"role" should be a type of 'text'`,
        'string.empty': `"role" cannot be an empty field`,
        'any.required': `"role" is a required field`
    }),
}).options({ abortEarly: false, allowUnknown: false });