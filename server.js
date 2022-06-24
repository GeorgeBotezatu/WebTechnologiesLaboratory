import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
//routes
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import consoleRoutes from "./routes/consoleRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

//app setUp
dotenv.config();
const app = express();

//use this  for get data from url
app.use(express.json({ extended: false }));
app.use(
	cors({
		origin: process.env.CORS_URL,
		credentials: true,
	})
);

//connect to db
connectDB();

//bind routes
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/console", consoleRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dashboard", dashboardRoutes);

//

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`.yellow.bold));
