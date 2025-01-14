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
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

const User = model('user', userSchema)

const joiUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(6)
    .required(),
})

module.exports = { User, joiUserSchema }
