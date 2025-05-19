const Train = require("../models/train");

const addTrain = async (req, res) => {
	try {
		const { name, source, destination, totalSeats } = req.body;

		if (!name || !source || !destination || !totalSeats) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}

		const train = await Train.create({
			name,
			source,
			destination,
			totalSeats,
			availableSeats: totalSeats,
		});

		res.status(201).json({ message: "Train added successfully.", train });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const updateTrain = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, source, destination, totalSeats, availableSeats } =
			req.body;

		const train = await Train.findByPk(id);
		if (!train) {
			return res.status(404).json({ message: "Train not found." });
		}

		if (name !== undefined) train.name = name;
		if (source !== undefined) train.source = source;
		if (destination !== undefined) train.destination = destination;
		if (totalSeats !== undefined) train.totalSeats = totalSeats;
		if (availableSeats !== undefined) train.availableSeats = availableSeats;

		await train.save();

		res.status(200).json({ message: "Train updated successfully.", train });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const deleteTrain = async (req, res) => {
	try {
		const { id } = req.params;

		const train = await Train.findByPk(id);
		if (!train) {
			return res.status(404).json({ message: "Train not found." });
		}

		await train.destroy();

		res.status(200).json({ message: "Train deleted successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const getAvailableTrains = async (req, res) => {
	try {
		const { source, destination } = req.query;

		if (!source || !destination) {
			return res
				.status(400)
				.json({ message: "Source and destination are required." });
		}

		const trains = await Train.findAll({
			where: {
				source,
				destination,
			},
			attributes: [
				"id",
				"name",
				"source",
				"destination",
				"availableSeats",
			],
		});

		res.status(200).json({ trains });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const getAllTrains = async (req, res) => {
	try {
		const trains = await Train.findAll();
		res.status(200).json({ trains });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

module.exports = {
	addTrain,
	getAvailableTrains,
	getAllTrains,
    updateTrain,
    deleteTrain,
};
