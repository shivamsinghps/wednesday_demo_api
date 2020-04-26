const express = require('express');

const router = express.Router();

const UserController = require('./controller/user');
// const CarController = require('./controller/car');
// const BokingController = require('./controller/car');
const checkAuth = require('../middlewares/auth');

router.get('/users', UserController.user);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

// router.get('/book', checkAuth, UserController.create_user_booking);
//
// router.get('/cancel', checkAuth, BokingController.cancle_user_booking);
//
// router.get('/bookings', checkAuth, BokingController.get_user_bookings);
//
// router.get('/nearbycars', checkAuth, CarController.get_nearby_car);

router.delete('/users/:userId', checkAuth, UserController.user_delete);

// router.delete('/car/', adminAuth, CarController.car_delete);

module.exports = router;
