import Joi from 'joi';

// Booking validation schema
const bookingSchema = Joi.object({
    start_at: Joi.date().required().messages({
      'date.base': `"start_at" should be a type of 'date'`,
      'any.required': `"start_at" is a required field`
    }),
    finish_at: Joi.date().required().messages({
      'date.base': `"finish_at" should be a type of 'date'`,
      'any.required': `"finish_at" is a required field`
    }),
    user: Joi.string().required().messages({
      'string.base': `"user" should be a type of 'text'`,
      'string.empty': `"user" cannot be an empty field`,
      'any.required': `"user" is a required field`
    }),
  }).options({ abortEarly: false, allowUnknown: false });

export default bookingSchema;