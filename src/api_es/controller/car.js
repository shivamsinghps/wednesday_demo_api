const Car = require('../../models/Car');
const errorInit = require('../../util_functions/errorcrtr');
const db = require('../../database/connection');

const {
  sequelize,
} = db;
const {
  Sequelize,
} = db;

exports.get_nearby_car = async (req, res, next) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const attributes = Object.keys(Car.rawAttributes);
  const location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
  const distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('car_location'), location);
  attributes.push([distance, 'distance']);
  let instances = {};
  try {
    instances = await Car.findAll({
      attributes,
      order: [
        [distance, 'ASC'],
      ],
      where: sequelize.and({
        car_status: 'open',
      }, sequelize.where(distance, Sequelize.Op.ne, null)),
      limit: 5,
    });
  } catch (err) {
    next(errorInit(`${err.message}database connection error`, 500));
  }
  res.status(200)
    .json(instances);
};
