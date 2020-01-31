const User = require('../models/users')

module.exports = (app) => {
  app.post('/registration', (req, res, next) => {
    const { body } = req
    const email = body.email
    const pwd = body.pwd
    const pseudo = body.pseudo

    User.findOne({ email: email }, function (err, user) {
      if (err) return console.error(err)
      if (user) {
        res.json({ message: email + ' is already used' })
      } else {
        const newUser = new User({
          email: email,
          pwd: pwd,
          pseudo: pseudo,
          isAdmin: false
        })
        newUser.save(function (err) {
          if (err) return console.error(err)
          console.log(newUser.email + ' saved to users collection.')
          res.json({ message: email + ' your account has been registered' })
        })
      }
    })
  })
}
