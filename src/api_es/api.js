const express = require('express');

const router = express.Router();

const UserController = require('./controller/user');
const CarController = require('./controller/car');
const BookingController = require('./controller/booking');
const checkAuth = require('../middlewares/auth');
// const checkAdmin = require('../middlewares/auth');

router.get('/users', UserController.user);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/users/:userId', UserController.user_delete);

router.post('/book', BookingController.create_user_booking);

router.patch('/booking_update', BookingController.bookings_update);

router.get('/bookings', BookingController.get_user_bookings);
//
// router.get('/cars', checkAdmin, CarController.cars);
//
router.get('/nearbycars', CarController.get_nearby_car);
//
// router.delete('/car/', checkAdmin, CarController.car_delete);

module.exports = router;
