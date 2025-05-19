const express = require("express");
const {
	addTrain,
	updateTrain,
	deleteTrain,
	getAvailableTrains,
	getAllTrains,
} = require("../controllers/trainController");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/add", isAdmin, addTrain);

router.put("/update/:id", isAdmin, updateTrain);

router.delete("/delete/:id", isAdmin, deleteTrain);

router.get("/available", getAvailableTrains);
router.get("/all", getAllTrains);

module.exports = router;
