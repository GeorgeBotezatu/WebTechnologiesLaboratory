import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
//routes
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import consoleRoutes from "./routes/consoleRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`.yellow.bold));
