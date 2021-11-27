import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

//use this  for get data from url
app.use(express.json({ extended: false }));

//connect to db
connectDB();

app.get("/", (req, res) => {
	res.send("hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`.yellow.bold));
