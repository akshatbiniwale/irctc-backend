require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
