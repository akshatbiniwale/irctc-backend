require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate()
	.then(() => {
		console.log("Connected to MySQL database");
		db.sync({ alter: true })
			.then(() => console.log("Database synced"))
			.catch((err) => console.error("Database sync failed:", err));
	})
	.catch((err) => {
		console.error("Database connection failed:", err);
		process.exit(1);
	});

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
