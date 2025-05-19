const Booking = require("../models/booking");
const Train = require("../models/train");
const sequelize = require("../config/db");

const bookSeat = async (req, res) => {
	const userId = req.user.id;
	const { trainId } = req.params;

	if (!trainId) {
		return res.status(400).json({ message: "trainId is required." });
	}

	const transaction = await sequelize.transaction();

	try {
		const train = await Train.findOne({
			where: { id: trainId },
			transaction,
			lock: true,
		});

		if (!train) {
			await transaction.rollback();
			return res.status(404).json({ message: "Train not found." });
		}

		if (train.availableSeats <= 0) {
			await transaction.rollback();
			return res.status(400).json({ message: "No seats available." });
		}

		train.availableSeats -= 1;
		await train.save({ transaction });

		const booking = await Booking.create(
			{
				userId,
				trainId,
			},
			{ transaction }
		);

		await transaction.commit();

		res.status(201).json({
			message: "Booking successful.",
			booking,
		});
	} catch (error) {
		await transaction.rollback();
		console.error(error);
		res.status(500).json({
			message: "Booking failed.",
			error: error.message,
		});
	}
};

const getBookingDetails = async (req, res) => {
	const { bookingId } = req.params;

	try {
		const booking = await Booking.findOne({
			where: { id: bookingId },
			include: {
				model: Train,
				attributes: ["name", "source", "destination"],
			},
		});

		if (!booking) {
			return res.status(404).json({ message: "Booking not found." });
		}

		res.status(200).json({ booking });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const cancelBooking = async (req, res) => {
	const userId = req.user.id;
	const { bookingId } = req.params;

	const transaction = await sequelize.transaction();

	try {
		const booking = await Booking.findOne({
			where: { id: bookingId },
			transaction,
			lock: true,
		});

		if (!booking) {
			await transaction.rollback();
			return res.status(404).json({ message: "Booking not found." });
		}

		if (booking.userId !== userId && req.user.role !== "admin") {
			await transaction.rollback();
			return res
				.status(403)
				.json({ message: "Not authorized to cancel this booking." });
		}

		const train = await Train.findByPk(booking.trainId, {
			transaction,
			lock: true,
		});
		if (train) {
			train.availableSeats += 1;
			await train.save({ transaction });
		}

		booking.status = "cancelled";
		await booking.save({ transaction });

		await transaction.commit();

		res.status(200).json({ message: "Booking cancelled successfully." });
	} catch (error) {
		await transaction.rollback();
		console.error(error);
		res.status(500).json({
			message: "Cancellation failed.",
			error: error.message,
		});
	}
};

const getAllBookings = async (req, res) => {
	try {
		const bookings = await Booking.findAll({
			include: {
				model: Train,
				attributes: ["name", "source", "destination"],
			},
		});
		res.status(200).json({ bookings });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Could not fetch bookings.",
			error: error.message,
		});
	}
};

const getBookingHistory = async (req, res) => {
	const userId = req.user.id;
	try {
		const bookings = await Booking.findAll({
			where: { userId },
			include: {
				model: Train,
				attributes: ["name", "source", "destination"],
			},
		});
		res.status(200).json({ bookings });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Could not fetch booking history.",
			error: error.message,
		});
	}
};

module.exports = {
	bookSeat,
	getBookingDetails,
	cancelBooking,
	getAllBookings,
	getBookingHistory,
};
