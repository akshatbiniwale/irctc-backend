const { Booking, Train, sequelize } = require("../models");

const bookSeat = async (req, res) => {
	const userId = req.user.id;
	const { trainId } = req.body;

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
	const userId = req.user.id;
	const { bookingId } = req.params;

	try {
		const booking = await Booking.findOne({
			where: {
				id: bookingId,
				userId,
			},
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
		res.status(500).json({
			message: "Could not fetch booking details.",
			error: error.message,
		});
	}
};

module.exports = {
	bookSeat,
	getBookingDetails,
};
