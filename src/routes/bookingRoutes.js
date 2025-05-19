const express = require("express");
const {
	bookSeat,
	getBookingDetails,
} = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", verifyToken, bookSeat);
router.get("/:bookingId", verifyToken, getBookingDetails);

module.exports = router;
