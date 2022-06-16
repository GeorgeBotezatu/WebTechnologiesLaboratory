import mongoose from "mongoose";

const reportchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	description: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	problemLink: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Problem = mongoose.model("problem", reportchema);
export default Problem;
