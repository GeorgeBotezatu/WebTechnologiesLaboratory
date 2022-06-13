import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	about: {
		website: {
			type: String,
		},
		status: {
			type: String,
		},
		skills: {
			type: [String],
		},
		bio: {
			type: String,
		},
	},

	githubusername: {
		type: String,
	},
	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			company: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	education: [
		{
			school: {
				type: String,
				required: true,
			},
			degree: {
				type: String,
				required: true,
			},
			fieldofstudy: {
				type: String,
				required: true,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	codeSaves: [
		{
			name: {
				type: String,
				required: true,
			},
			js: {
				type: String,
			},
			css: {
				type: String,
			},
			html: {
				type: String,
			},
		},
	],
	enroledCourses: [
		{
			courseId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "course",
			},
			quizScores: [
				{
					chapterId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "course",
					},
					quizScore: String,
				},
			],
			numOfChapters: Number,
			completedChapters: [
				{
					chapterId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "course",
					},
				},
			],
			finished: {
				type: Boolean,
				default: false,
			},
			enroledDate: {
				type: Date,
				default: Date.now,
			},
		},
	],
	social: {
		youtube: { type: String },
		twitter: { type: String },
		facebook: { type: String },
		linkedin: { type: String },
		instagram: { type: String },
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Profile = mongoose.model("profile", profileSchema);
export default Profile;
