/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * controller to mount routes related functions .
 * @type {object}
 * @const
 */

const UserController = require('./controller/user');
const CarController = require('./controller/car');
const BookingController = require('./controller/booking');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const checkAuth = require('../middlewares/auth');


/**
 *Route for Handling User SignUp
 */
router.post('/signup', UserController.user_signup);

/**
 *Route for Handling User Signin
 */
router.post('/login', UserController.user_login);

/**
 *Route for Handling of New Booking
 */
router.post('/book', checkAuth, BookingController.create_user_booking);

/**
 *Route for Handling Update of a Booking
 */
router.patch('/booking_update', checkAuth, BookingController.bookings_update);

/**
 *Route for Handling Retrival of User Bookings
 */
router.get('/bookings/', checkAuth, BookingController.get_user_bookings);

/**
 *Route for Handling the Retrival of NearbyCars
 */
router.get('/nearbycars', checkAuth, CarController.get_nearby_car);

module.exports = router;
