const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define(
	"User",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM("admin", "user"),
			defaultValue: "user",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = User;
