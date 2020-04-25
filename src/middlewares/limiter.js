const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.MAX_API_CALL,
  message: 'Reached api call limit try after sometime',
});
