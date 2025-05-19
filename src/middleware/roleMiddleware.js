require("dotenv").config();

const isAdmin = (req, res, next) => {
	const apiKey = req.headers["x-api-key"];
	if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
		return res
			.status(401)
			.json({ message: "Invalid or missing admin API key." });
	}

	if (req.user && req.user.role === "admin") {
		return next();
	} else {
		return res.status(403).json({ message: "Admin access required." });
	}
};

module.exports = { isAdmin };
