const error_init = require('../../util_functions/errorcrtr');
const Car = require('../../models/Car');

const db = require('../../database/connection')

const {
	sequelize,
} = db;
const {
	Sequelize,
} = db;

exports.get_nearby_car = async (req, res, next) => {
	const lat = parseFloat(req.query.lat)
	const lng = parseFloat(req.query.lng)
	let attributes = Object.keys(Car.rawAttributes);
	let location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
	let distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('car_location'), location);
	attributes.push([distance, 'distance']);
	const instances = await Car.findAll({
		attributes: attributes,
		order: [
			[distance, 'ASC']
		],
		where: sequelize.and({
			car_status: 'open'
		}, sequelize.where(distance, Sequelize.Op.ne, null)),
	})

	res.status(200)
		.json(instances)
};

// exports.car_delete = (req, res, next) => {
// can use admin db seperate but for ease used type yos
// User.findOne({
// where: {
// type: 'Admin',,
// },
// })
// .then((result) => {
// if (result.email === req.userData.email) {
// Car.findOne({
// where: {
// id: req.params.carId
// }
// })
// .then(result => {
// result.destroy()
// res.status(200)
// .json({
// message: 'Car deleted',
// });
// })
// .catch((err) => next(error_init('Car Not Found', 409)));
// } else {
// next(error_init('Not Authorised', 401))
// }
// })
// .catch((err) => next(err));
// };
//
// exports.cars = (req, res, next) => {
// Car.findAll()
// .then((result) => {
// console.log(result.length);
// res.status(200)
// .send(result);
// })
// .catch((err) => next(err));
// };
