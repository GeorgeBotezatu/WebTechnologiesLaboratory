import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
	courseTitle: { type: String, required: true },
	courseDescription: { type: String, required: true },
	chapters: [
		{
			chapterTitle: {
				type: String,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
			order: {
				type: Number,
				required: true,
			},
			quiz: [
				{
					question: {
						type: String,
						required: true,
					},
					answer1: {
						text: {
							type: String,
							required: true,
						},
						correct: {
							type: Boolean,
						},
					},
					answer2: {
						text: {
							type: String,
							required: true,
						},
						correct: {
							type: Boolean,
						},
					},
					answer3: {
						text: {
							type: String,
							required: true,
						},
						correct: {
							type: Boolean,
						},
					},
					answer4: {
						text: {
							type: String,
							required: true,
						},
						correct: {
							type: Boolean,
						},
					},
				},
			],
		},
	],
});

const Course = mongoose.model("course", courseSchema);
export default Course;
