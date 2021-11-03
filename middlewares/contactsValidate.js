const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).send(error.message)
    };
    next()
  }
}

module.exports = validation
