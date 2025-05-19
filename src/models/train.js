const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Train = db.define(
	"Train",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		source: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		destination: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		totalSeats: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		availableSeats: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Train;
