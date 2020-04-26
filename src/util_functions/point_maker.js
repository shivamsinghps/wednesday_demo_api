const db = require('../database/connection');

const {
  sequelize,
} = db;

module.exports = (location) => {
  const lat = parseFloat(location.latitude);
  const lng = parseFloat(location.longitude);

  const loc = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
  return loc;
};
