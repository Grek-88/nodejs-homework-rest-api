const controllerWrapper = require('./controllerWrapper')
const validate = require('./validate')
const authenticated = require('./authenticated')
const upload = require('./upload')

module.exports = {
  controllerWrapper,
  validate,
  authenticated,
  upload
}
