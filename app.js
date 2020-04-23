require('dotenv')
	.config()

const express = require("express");
const morgan = require("morgan")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev'))

// API ENDPOINTS

app.use((req, res, next) => {
	const error = new Error('Request Not Found');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
