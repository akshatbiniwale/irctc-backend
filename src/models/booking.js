const { DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./user");
const Train = require("./train");

const Booking = db.define(
	"Booking",
	{
		status: {
			type: DataTypes.ENUM("booked", "cancelled"),
			defaultValue: "booked",
		},
	},
	{
		timestamps: true,
	}
);

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Train.hasMany(Booking, { foreignKey: "trainId" });
Booking.belongsTo(Train, { foreignKey: "trainId" });

module.exports = Booking;
