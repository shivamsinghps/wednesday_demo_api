const error_init = require('../../util_functions/errorcrtr');
const point_maker = require('../../util_functions/point_maker');
const Booking = require('../../models/Booking');
const Car = require('../../models/Car');

const db = require('../../database/connection')

const {
	sequelize,
} = db;
const {
	Sequelize,
} = db;



Car.hasMany(Booking, {
	foreignKey: 'car_id',
});
Booking.hasOne(Car, {
	foreignKey: 'id',
});


exports.get_user_bookings = (req, res, next) => {
	Booking.findAll({
			where: {
				user_id: req.query.userId,
			},
			include: [{
				model: Car,
			}],

		})
		.then((result) => {
			res.status(200)
				.send(result);
		})
		.catch((err) => error_init(`${err.message}database connection error`, 500));
};

exports.create_user_booking = async (req, res, next) => {
	var lat1 = parseFloat(req.body.initial_loc[0]);
	var lng1 = parseFloat(req.body.initial_loc[1]);
	var lat2 = parseFloat(req.body.final_loc[0]);
	var lng2 = parseFloat(req.body.final_loc[1]);
	let attributes = Object.keys(Car.rawAttributes);
	let location = sequelize.literal(`ST_GeomFromText('POINT(${lng1} ${lat1})')`);
	let distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('car_location'), location);
	attributes.push([distance, 'distance']);

	const instances = await Car.findAll({
		attributes: attributes,
		order: [
			[distance, 'Asc']
		],
		where: sequelize.and({
			car_status: 'open'
		}, sequelize.where(distance, Sequelize.Op.lte, req.query.maxDistance)),
	})

	Booking.create({
			user_id: req.body.userId,
			initial_loc: sequelize.literal(`ST_GeomFromText('POINT(${lng1} ${lat1})')`),
			final_loc: sequelize.literal(`ST_GeomFromText('POINT(${lng2} ${lat2})')`),
			booking_status: 'inTransit',
			booking_amt: req.body.booking_amt,
			car_id: instances[0].id
		})
		.then((result) => {
			Car.update({
					car_status: 'inTransit'
				}, {
					where: {
						id: instances[0].id
					}
				})
				.then((result) => {
					res.status(201)
						.json({
							message: 'Booking created'
						})
				})
				.catch((err) => next(error_init('database connection error 1', 500)));
		})
		.catch((err) => next(error_init(err.message + 'database connection error 2', 500)))
};

exports.bookings_update = (req, res, next) => {
	Booking.update({
			booking_status: req.body.status_up
		}, {
			where: {
				user_id: req.body.userId,
				booking_status: 'inTransit'
			},

		})
		.then((result) => {
			res.status(200)
				.send(result);
		})
		.catch((err) => error_init(`${err.message}database connection error`, 500));
};
