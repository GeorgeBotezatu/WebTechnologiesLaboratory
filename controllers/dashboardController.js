import CustomStatusCodeError from "../utils/customError.js";
import {
	POSTS_NOT_FOUND,
	PROBLEM_NOT_FOUND,
	SERVER_ERROR,
	USER_NOT_FOUND,
} from "../utils/textUtils.js";
import Problem from "../models/reportSchema.js";
import User from "../models/userScehma.js";
import Post from "../models/postSchema.js";
import Course from "../models/coursesSchema.js";
import { validationResult } from "express-validator";
import { verifyInputErrors } from "../utils/utilFunctions.js";

//|----------------|
//|---Controllers--|
//|----------------|

const addNewProblem = async (req, res) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const user = await User.findById(req.user.id).select("-password");
		const newProblem = new Problem({
			description: req.body.description,
			problemLink: req.body.problemLink,
			user: req.user.id,
			name: user.name,
			email: user.email,
		});

		const problem = await newProblem.save();
		res.status(200).json(problem);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const getAllProblems = async (req, res) => {
	try {
		const problems = await Problem.find();
		if (!problems) {
			throw new CustomStatusCodeError(PROBLEM_NOT_FOUND, 404);
		}
		res.status(200).json(problems);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteProblem = async (req, res) => {
	try {
		const problem = await Problem.findById(req.params.problemId);
		if (!problem) {
			throw new CustomStatusCodeError(POST_NOT_FOUND, 404);
		}
		await problem.remove();
		const problems = await Problem.find();
		res.status(200).json(problems);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const getLatestData = async (req, res) => {
	try {
		const users = await User.find()
			.sort({ _id: -1 })
			.limit(3)
			.select("-password");
		if (!users) {
			throw new CustomStatusCodeError(USER_NOT_FOUND, 404);
		}
		const posts = await Post.find().sort({ _id: 1 }).limit(5);
		if (!posts) {
			throw new CustomStatusCodeError(POSTS_NOT_FOUND, 404);
		}

		const user = await User.find();
		const numberOfUsers = user.length;

		const post = await Post.find();
		const numberOfPosts = post.length;

		const problems = await Problem.find();
		const numberOfProblems = problems.length;

		const courses = await Course.find();
		const numberOfCourses = courses.length;

		let numberOfChapters = 0;
		for (let i = 0; i < numberOfCourses; i++) {
			numberOfChapters += courses[i].chapters.length;
		}

		const latestData = {
			latestUser: users,
			latestPost: posts,
			numberOfUsers: numberOfUsers,
			numberOfPosts: numberOfPosts,
			numberOfProblems: numberOfProblems,
			numberOfCourses: numberOfCourses,
			numberOfChapters: numberOfChapters,
		};

		res.status(200).json(latestData);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

export { addNewProblem, getAllProblems, deleteProblem, getLatestData };
