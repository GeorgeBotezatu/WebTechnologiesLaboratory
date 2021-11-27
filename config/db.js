import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		});
		console.log("Connected to DB".green.bold);
	} catch (error) {
		console.error(`Error: ${error.message}`.red.bold);
		process.exit(1);
	}
};

export default connectDB;
