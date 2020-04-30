const errorInit = require('../../util_functions/errorcrtr');
const Booking = require('../../models/Booking');
const Car = require('../../models/Car');

const db = require('../../database/connection');

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
  sourceKey: 'car_id',
});

exports.get_user_bookings = async (req, res, next) => {
  const pageskip = parseInt(process.env.PAGE_SIZE, 10) * parseInt(req.query.page, 10);
  const pageitem = parseInt(process.env.PAGE_SIZE, 10);


  const bookings = await Booking.findAll({

    where: {
      user_id: req.userData.userId,
    },
    offset: pageskip,
    limit: pageitem,
    include: [{
      model: Car,
    }],

  });
  res.status(200)
    .json({
      bookings,
    });
};


exports.create_user_booking = async (req, res, next) => {
  let booking = [];
  try {
    booking = await Booking.findAll({
      where: {
        user_id: req.userData.userId,
        booking_status: 'inTransit',
      },
    });
  } catch (err) {
    next(errorInit(`${err.message}database connection error`, 500));
  }
  if (booking.length >= 1) {
    res.status(409)
      .json({
        message: 'Booking already exists',
      });
  } else {
    const lat1 = parseFloat(req.body.initial_loc[0]);
    const lng1 = parseFloat(req.body.initial_loc[1]);
    const lat2 = parseFloat(req.body.final_loc[0]);
    const lng2 = parseFloat(req.body.final_loc[1]);
    const attributes = Object.keys(Car.rawAttributes);
    const location = sequelize.literal(`ST_GeomFromText('POINT(${lng1} ${lat1})')`);
    const distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('car_location'), location);
    attributes.push([distance, 'distance']);
    let instances = [];
    try {
      instances = await Car.findAll({
        attributes,
        order: [
          [distance, 'Asc'],
        ],
        where: sequelize.and({
          car_status: 'open',
        }, sequelize.where(distance, Sequelize.Op.lte, req.query.maxDistance)),
      });
    } catch (err) {
      next(errorInit(`${err.message}database connection error`, 500));
    }

    Booking.create({
      user_id: req.userData.userId,
      initial_loc: sequelize.literal(`ST_GeomFromText('POINT(${lng1} ${lat1})')`),
      final_loc: sequelize.literal(`ST_GeomFromText('POINT(${lng2} ${lat2})')`),
      booking_status: 'inTransit',
      booking_amt: req.body.booking_amt,
      car_id: instances[0].id,
    })
      .then((result) => {
        const bookId = result.id;
        Car.update({
          car_status: 'inTransit',
        }, {
          where: {
            id: instances[0].id,
          },
        })
          .then(() => {
            res.status(201)
              .json({
                bookId,
                message: 'Booking created',
              });
          })
          .catch((err) => next(errorInit('database connection error 1', 500)));
      })
      .catch((err) => next(errorInit(`${err.message}database connection error 2`, 500)));
  }
};

exports.bookings_update = async (req, res, next) => {
  let booking = {};
  try {
    booking = await Booking.findOne({
      where: {
        user_id: req.userData.userId,
        booking_status: 'inTransit',
      },
    });
  } catch (err) {
    next(errorInit(`${err.message}database connection error`, 500));
  }
  if (!booking) {
    res.status(404)
      .json({
        message: 'Not Found',
      });
  } else {
    try {
      await Car.update({
        car_status: 'open',
      }, {
        where: {
          id: booking.car_id,
        },
      });
    } catch (err) {
      next(errorInit(`${err.message}database connection error`, 500));
    }
    booking.booking_status = req.body.status_up;
    await booking.save();

    res.status(200)
      .json({
        message: 'Updated',
      });
  }
};
