import { validationResult } from "express-validator";
import Course from "../models/coursesSchema.js";
import CustomStatusCodeError from "../utils/customError.js";
import {
	CHAPTER_EXCEDEED,
	COURSE_NOT_FOUND,
	NEW_ORDER_INTEGER,
	SERVER_ERROR,
} from "../utils/textUtils.js";
import { matchInputs, verifyInputErrors } from "../utils/utilFunctions.js";

const validateCreateCourse = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const data = req.body;
		const validInputs = { courseTitle: "", courseDescription: "" };
		matchInputs(data, validInputs);

		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};
const validateChapterCreate = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		const data = req.body;
		const validInputs = {
			chapterTitle: "",
			content: "",
		};

		matchInputs(data, validInputs);
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const validateAddQuizQuestion = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		const data = req.body;
		const validInputs = {
			quiz: "",
		};

		matchInputs(data, validInputs);
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const validateChangeChapterOrder = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		const data = req.body;
		const validInputs = {
			newOrder: "",
		};
		matchInputs(data, validInputs);

		if (typeof data.newOrder !== "number") {
			console.log(typeof data.newOrder);
			throw new CustomStatusCodeError(NEW_ORDER_INTEGER, 403);
		}
		if (Math.round(data.newOrder) > course.chapters.length) {
			throw new CustomStatusCodeError(CHAPTER_EXCEDEED, 403);
		}
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

export {
	validateCreateCourse,
	validateChapterCreate,
	validateAddQuizQuestion,
	validateChangeChapterOrder,
};
