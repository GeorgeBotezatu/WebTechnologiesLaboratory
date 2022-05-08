import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
	addChapter,
	addQuizQuestion,
	changeChapterOrder,
	createCourse,
	deleteChapter,
	deleteCourse,
	deleteQuizQuestion,
	editChapter,
	editCourse,
	getCourseById,
	getCoursesList,
} from "../controllers/coursesController.js";
import { admin, auth } from "../middleware/auth.js";
import {
	validateAddQuizQuestion,
	validateChangeChapterOrder,
	validateChapterCreate,
	validateCreateCourse,
} from "../middleware/coursesMiddleware.js";
import {
	ANSWER1,
	ANSWER2,
	ANSWER3,
	ANSWER4,
	CHAPTER_TITLE,
	CONTENT,
	COURSE_DESCRIPTION,
	COURSE_TITLE,
	NEW_ORDER,
	QUESTION,
} from "../utils/constants.js";
import {
	ANSWER_1_REQUIRED,
	ANSWER_2_REQUIRED,
	ANSWER_3_REQUIRED,
	ANSWER_4_REQUIRED,
	CONTENT_REQUIRED,
	DESCRIPTION_REQUIRED,
	NEW_ORDER_REQUIRED,
	QUESTION_REQUIRED,
	TITLE_REQUIRED,
} from "../utils/textUtils.js";

// @roaute GET api/courses/list
// @desc   get courses list only title, description and id
// @access private
router.get("/list", auth, getCoursesList);

// @roaute GET api/courses/:courseId
// @desc   get courses by Id
// @access private
router.get("/:courseId", auth, getCourseById);

//@roaute POST api/courses/create
//@desc   create a new course
//@access admin only
router.post(
	"/create",
	auth,
	admin,
	[
		check(COURSE_TITLE, TITLE_REQUIRED).not().isEmpty(),
		check(COURSE_DESCRIPTION, DESCRIPTION_REQUIRED).not().isEmpty(),
	],
	validateCreateCourse,
	createCourse
);

//@roaute PUT api/courses/create/:courseId
//@desc   create a new chapter to a course
//@access admin only
router.put(
	"/create/:courseId/chapter",
	auth,
	admin,
	[
		check(CHAPTER_TITLE, TITLE_REQUIRED).not().isEmpty(),
		check(CONTENT, CONTENT_REQUIRED).not().isEmpty(),
	],
	validateChapterCreate,
	addChapter
);

//@roaute PUT api/courses/create/:courseId/chapter/:chapterId/quiz
//@desc   create a new question to a chapter quiz in a course
//@access admin only
router.put(
	"/create/:courseId/chapter/:chapterId/quiz",
	auth,
	admin,
	[
		check(QUESTION, QUESTION_REQUIRED).not().isEmpty(),
		check(ANSWER1, ANSWER_1_REQUIRED).not().isEmpty(),
		check(ANSWER2, ANSWER_2_REQUIRED).not().isEmpty(),
		check(ANSWER3, ANSWER_3_REQUIRED).not().isEmpty(),
		check(ANSWER4, ANSWER_4_REQUIRED).not().isEmpty(),
	],
	validateAddQuizQuestion,
	addQuizQuestion
);

//@roaute DELETE api/courses/:courseId
//@desc   DELETE an Entire course
//@access admin only
router.delete("/:courseId", auth, admin, deleteCourse);

//@roaute DELETE api/courses/:courseId/chapter/:chapeterId
//@desc   DELETE an Entire chapter
//@access admin only
router.delete("/:courseId/chapter/:chapterId", auth, admin, deleteChapter);

//@roaute DELETE api/courses/:courseId/chapter/:chapeterId/question/:questionId
//@desc   DELETE an Entire question
//@access admin only
router.delete(
	"/:courseId/chapter/:chapterId/question/:questionId",
	auth,
	admin,
	deleteQuizQuestion
);

//@roaute POST api/courses/:courseId
//@desc   edit course title and description
//@access admin only
router.put(
	"/:courseId",
	auth,
	admin,
	[
		check(COURSE_TITLE, TITLE_REQUIRED).not().isEmpty(),
		check(COURSE_DESCRIPTION, DESCRIPTION_REQUIRED).not().isEmpty(),
	],
	validateCreateCourse,
	editCourse
);

//@roaute PUT api/courses/create/:courseId
//@desc   edit a chapter title and content
//@access admin only
router.put(
	"/create/:courseId/chapter/:chapterId",
	auth,
	admin,
	[
		check(CHAPTER_TITLE, TITLE_REQUIRED).not().isEmpty(),
		check(CONTENT, CONTENT_REQUIRED).not().isEmpty(),
	],
	validateChapterCreate,
	editChapter
);

//@roaute PUT api/courses/create/:courseId/order
//@desc   change chapter order
//@access admin only
router.put(
	"/:courseId/chapter/:chapterId/order",
	auth,
	admin,
	[check(NEW_ORDER, NEW_ORDER_REQUIRED).not().isEmpty()],
	validateChangeChapterOrder,
	changeChapterOrder
);

export default router;
