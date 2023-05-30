const e = require('express')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      const token = req.headers.authorization.split('Bearer ')[1]
      const decoded = jwt.verify(token, 'secret_key')
      if (decoded.emailVerified == false) {
        return res.status(400).send({ Message: 'Email not verified' })
      } else {
        req.userData = decoded
        next()
      }
    } catch (err) {
      res.status(400).send({ Error: 'Invalid/Expired token' })
    }
  } else {
    return res.status(403).send({ Message: 'UnAuthorized' })
  }
}
