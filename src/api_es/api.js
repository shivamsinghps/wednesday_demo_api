const express = require('express')

const router = express.Router()

const UserController = require('./controller/user')
const CarController = require('./controller/car')
const BookingController = require('./controller/booking')
const checkAuth = require('../middlewares/auth')
// const checkAdmin = require('../middlewares/auth');

// router.get('/users', UserController.user)

router.post('/signup', UserController.user_signup)

router.post('/login', UserController.user_login)

// router.delete('/users/:userId', UserController.user_delete);

router.post('/book', checkAuth, BookingController.create_user_booking)

router.patch('/booking_update', checkAuth, BookingController.bookings_update)

router.get('/bookings', checkAuth, BookingController.get_user_bookings)

router.get('/nearbycars', checkAuth, CarController.get_nearby_car)
//
// router.delete('/car/', checkAdmin, CarController.car_delete);

module.exports = router
