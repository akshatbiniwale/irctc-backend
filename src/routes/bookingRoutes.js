const express = require("express");
const {
	bookSeat,
	cancelBooking,
	getAllBookings,
	getBookingHistory,
	getBookingDetails,
} = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/book/:trainId", verifyToken, bookSeat);

router.put("/cancel/:bookingId", verifyToken, cancelBooking);

router.get("/all", verifyToken, isAdmin, getAllBookings);
router.get("/history", verifyToken, getBookingHistory);
router.get("/:bookingId", verifyToken, isAdmin, getBookingDetails);

module.exports = router;
