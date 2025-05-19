const express = require("express");
const {
	addTrain,
	getSeatAvailability,
} = require("../controllers/trainController");
const { adminApiKeyMiddleware } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/add", adminApiKeyMiddleware, addTrain);

router.get("/availability", getSeatAvailability);

module.exports = router;
