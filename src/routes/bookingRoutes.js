const express = require("express");
const {
	bookSeat,
	getBookingDetails,
} = require("../controllers/bookingController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/book", authenticateToken, bookSeat);
router.get("/:bookingId", authenticateToken, getBookingDetails);

module.exports = router;
