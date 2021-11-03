const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

const User = model('user', userSchema)

const joiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  phone: Joi.number().required(),

  favorite: Joi.boolean()
})

module.exports = { User, joiSchema }
