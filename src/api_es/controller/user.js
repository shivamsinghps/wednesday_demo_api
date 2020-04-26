const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const error_init = require('../../util_functions/errorcrtr')
const User = require('../../models/Users');

exports.user_signup = (req, res, next) => {
	const user = User.findAll({
			where: {
				email: req.body.email,
			},
		})
		.then((user) => {
			if (user.length >= 1) {
				next(error_init('User Exists', 409))
			}
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					next(err)
				}
				const user = User.create({
						email: req.body.email,
						password: hash,
						user_name: req.body.user_name,
						contact_no: req.body.contact_no
					})
					.then((result) => {
						res.status(201)
							.json({
								message: 'User created'
							});
					})
					.catch((err) => next(error_init('database connection error', 500)))
			});
		})
		.catch((err) => next(error_init('database connection error', 500)));
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
					next(error_init('Check password', 401))
				}
				if (result) {
					const token = jwt.sign({
							email: user.email,
							userId: user.id,
						},
						process.env.SECRET, {
							expiresIn: '1h',
						},
					);
					return res.status(200)
						.json({
							message: 'Auth successful',
							token,
						});
				}
			});
		})
		.catch((err) => next(error_init('Check your Email', 401)));
};

exports.user_delete = (req, res, next) => {
	User.findOne({
			where: {
				id: req.params.userId,
			},
		})
		.then((result) => {
			if (result.email === req.userData.email) {
				result.destroy();
				res.status(200)
					.json({
						message: 'User deleted',
					});
			} else {
				next(error_init('Not Authorised', 401))
			}
		})
		.catch((err) => next(err));
};

exports.user = (req, res, next) => {
	User.findAll()
		.then((result) => {
			res.status(200)
				.send(result);
		})
		.catch((err) => next(err));
};
