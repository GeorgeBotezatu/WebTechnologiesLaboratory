import Course from "../models/coursesSchema.js";
import CustomStatusCodeError from "../utils/customError.js";
import mongoose from "mongoose";
import {
	CHAPTER_NOT_FOUND,
	COURSE_CREATED,
	COURSE_NOT_FOUND,
	INVALID_ID,
	QUESTION_NOT_FOUND,
	SAME_ORDER,
	SERVER_ERROR,
} from "../utils/textUtils.js";

const getCoursesList = async (req, res) => {
	try {
		const courses = await Course.find().select("-chapters");
		if (!courses && !courses[0]) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		res.status(200).json(courses);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const getCourseById = async (req, res) => {
	try {
		const courseId = req.params.courseId;

		const course = await Course.findById(courseId);

		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const createCourse = async (req, res) => {
	try {
		const data = req.body;
		const courseFields = {
			courseTitle: data.courseTitle,
			courseDescription: data.courseDescription,
		};
		const course = new Course(courseFields);
		await course.save();
		return res.status(200).json({ msg: COURSE_CREATED });
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addChapter = async (req, res) => {
	try {
		const data = req.body;
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		const { chapterTitle, content } = data;
		const order = course.chapters ? course.chapters.length + 1 : 1;
		const quiz = [];
		const newChapter = { chapterTitle, content, order, quiz };
		course.chapters.push(newChapter);
		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};
const addQuizQuestion = async (req, res) => {
	try {
		const data = req.body;
		const courseId = req.params.courseId;
		const chapterId = req.params.chapterId;
		const { question, answer1, answer2, answer3, answer4 } = data;
		const course = await Course.findById(courseId);
		const newQuizQuestion = { question, answer1, answer2, answer3, answer4 };

		if (!course.chapters) {
			throw new CustomStatusCodeError("Nu sunt capitole", 404);
		}
		let chapterIndex = -1;
		for (let i = 0; i < course.chapters.length; i++) {
			if (course.chapters[i]._id.toString() === chapterId) {
				chapterIndex = i;
			}
		}
		if (chapterId === -1) {
			throw new CustomStatusCodeError(CHAPTER_NOT_FOUND, 404);
		}
		course.chapters[chapterIndex].quiz.push(newQuizQuestion);
		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteCourse = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findByIdAndRemove(courseId);

		if (course === null) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		const courses = await Course.find().select("-chapters");
		res.status(200).json(courses);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteChapter = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}

		const chapterId = req.params.chapterId;
		const removeIndex = course.chapters
			.map((item) => item.id)
			.indexOf(chapterId);
		if (removeIndex < 0) {
			throw new CustomStatusCodeError(CHAPTER_NOT_FOUND, 404);
		}

		if (removeIndex < course.chapters.length)
			for (let i = removeIndex + 1; i < course.chapters.length; i++) {
				course.chapters[i].order -= 1;
			}
		course.chapters.splice(removeIndex, 1);

		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteQuizQuestion = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}

		const chapterId = req.params.chapterId;
		const chapterIndex = course.chapters
			.map((item) => item.id)
			.indexOf(chapterId);
		if (chapterIndex < 0) {
			throw new CustomStatusCodeError(CHAPTER_NOT_FOUND, 404);
		}

		const questionId = req.params.questionId;

		const removeIndex = course.chapters[chapterIndex].quiz
			.map((item) => item.id)
			.indexOf(questionId);
		if (removeIndex < 0) {
			throw new CustomStatusCodeError(QUESTION_NOT_FOUND, 404);
		}
		course.chapters[chapterIndex].quiz.splice(removeIndex, 1);
		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const editCourse = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		const { courseTitle, courseDescription } = req.body;
		course.courseTitle = courseTitle;
		course.courseDescription = courseDescription;
		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const editChapter = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);

		const chapterId = req.params.chapterId;
		const editIndex = course.chapters.map((item) => item.id).indexOf(chapterId);
		if (editIndex < 0) {
			throw new CustomStatusCodeError(CHAPTER_NOT_FOUND, 404);
		}
		const { chapterTitle, content } = req.body;

		course.chapters[editIndex].chapterTitle = chapterTitle;
		course.chapters[editIndex].content = content;

		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const changeChapterOrder = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		//get chapter position
		const chapterId = req.params.chapterId;
		const chapterIndex = course.chapters
			.map((item) => item.id)
			.indexOf(chapterId);

		if (chapterIndex < 0) {
			throw new CustomStatusCodeError(CHAPTER_NOT_FOUND, 404);
		}
		const oldOrder = course.chapters[chapterIndex].order;
		const newOrderBrut = req.body.newOrder;
		const newOrder = Math.round(newOrderBrut);
		if (oldOrder === newOrder) {
			throw new CustomStatusCodeError(SAME_ORDER, 403);
		} else if (newOrder < oldOrder) {
			const oldCopy = course.chapters[oldOrder - 1];

			for (let i = oldOrder - 1; i > newOrder - 1; i--) {
				course.chapters[i] = course.chapters[i - 1];
				course.chapters[i - 1].order += 1;
			}
			course.chapters[newOrder - 1] = oldCopy;
			course.chapters[newOrder - 1].order = newOrder;
		} else {
			const oldCopy = course.chapters[oldOrder - 1];
			for (let i = oldOrder - 1; i < newOrder - 1; i++) {
				course.chapters[i] = course.chapters[i + 1];
				course.chapters[i].order -= 1;
			}
			course.chapters[newOrder - 1] = oldCopy;
			course.chapters[newOrder - 1].order = newOrder;
		}
		await course.save();
		res.status(200).json(course);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};
export {
	getCoursesList,
	getCourseById,
	createCourse,
	addChapter,
	addQuizQuestion,
	deleteCourse,
	deleteChapter,
	deleteQuizQuestion,
	editCourse,
	editChapter,
	changeChapterOrder,
};
