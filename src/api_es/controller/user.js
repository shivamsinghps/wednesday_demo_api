const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorInit = require('../../util_functions/errorcrtr');
const User = require('../../models/Users');

exports.user_signup = (req, res, next) => {
  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user.length >= 1) {
        next(errorInit('User Exists', 409));
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          next(err);
        }
        User.create({
          email: req.body.email,
          password: hash,
          user_name: req.body.user_name,
          contact_no: req.body.contact_no,
        })
          .then(() => {
            res.status(201)
              .json({
                message: 'User created',
              });
          })
          .catch((err) => next(errorInit(`${err.message}database connection error`, 500)));
      });
    })
    .catch((err) => next(errorInit(`${err.message}database connection error`, 500)));
};

exports.user_login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          next(errorInit('Check password', 409));
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user.id,
          },
          process.env.SECRET, {
            expiresIn: '1h',
          });
          return res.status(202)
            .json({
              message: 'Auth successful',
              token,
            });
        }
      });
    })
    .catch((err) => next(errorInit(`${err.message}Check your Email`, 404)));
};
