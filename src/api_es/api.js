const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {

	return res.send({
		id: '2',
		name: 'ds'
	});
});

module.exports = router;
