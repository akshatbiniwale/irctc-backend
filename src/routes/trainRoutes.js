const express = require("express");
const {
	addTrain,
	updateTrain,
	deleteTrain,
	getAvailableTrains,
	getAllTrains,
} = require("../controllers/trainController");
const { isAdmin } = require("../middleware/roleMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyToken, isAdmin, addTrain);

router.put("/update/:id", verifyToken, isAdmin, updateTrain);

router.delete("/delete/:id", verifyToken, isAdmin, deleteTrain);

router.get("/available", getAvailableTrains);
router.get("/all", getAllTrains);

module.exports = router;
