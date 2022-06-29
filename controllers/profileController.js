import Profile from "../models/profileSchema.js";
import Course from "../models/coursesSchema.js";
import CustomStatusCodeError from "../utils/customError.js";
import {
	ABOUT_SAVED,
	CHAPTER_COMPLETED,
	COURSE_NOT_FOUND,
	EDUCATION_NOT_FOUND,
	EXPERIENCE_NOT_FOUND,
	GITHUBUSERNAME_SAVED,
	NEED_TO_COMPLETE_CHAPTERS,
	NOT_ENROLLED,
	PROFILE_CREATED,
	PROFILE_EXIST,
	PROFILE_NOT_FOUND,
	SERVER_ERROR,
	SOCIAL_SAVED,
} from "../utils/textUtils.js";
//|----------------|
//|---Controllers--|
//|----------------|
const getMyProfile = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "avatar", "email", "isAdmin"]
		);
		if (!profile) {
			throw new CustomStatusCodeError(PROFILE_NOT_FOUND, 400);
		}
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const getProfileById = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.userId }).populate(
			"user",
			["name", "avatar", "email", "isAdmin"]
		);
		if (!profile) {
			throw new CustomStatusCodeError(PROFILE_NOT_FOUND, 400);
		}
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const createProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileExist(userId);
		//create user profile and save it
		const profileFields = {};
		profileFields.user = userId;
		const profile = new Profile(profileFields);
		await profile.save();
		return res.status(200).json({ msg: PROFILE_CREATED });
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const enroleToCourse = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const userId = req.user.id;
		const course = await Course.findById(courseId);
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const enrollFields = {
			courseId: course._id,
			quizScores: [],
			numOfChapters: course.chapters.length,
			completedChapters: [],
		};

		profile.enroledCourses.push(enrollFields);
		profile.save();
		return res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const completeChapter = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const userId = req.user.id;
		const chapterId = req.params.chapterId;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		let searchedCourseIndex = -1;
		for (let i = 0; i < profile.enroledCourses.length; i++) {
			if (profile.enroledCourses[i].courseId.toString() === courseId) {
				searchedCourseIndex = i;
			}
		}
		if (searchedCourseIndex === -1) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}
		let foundChapter = false;
		for (
			let i = 0;
			i < profile.enroledCourses[searchedCourseIndex].completedChapters.length;
			i++
		) {
			if (
				profile.enroledCourses[searchedCourseIndex].completedChapters[
					i
				]._id.toString() === chapterId
			) {
				foundChapter = true;
				break;
			}
		}

		if (foundChapter) {
			throw new CustomStatusCodeError(CHAPTER_COMPLETED, 404);
		}
		profile.enroledCourses[searchedCourseIndex].completedChapters.push(
			chapterId
		);
		profile.save();
		return res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};
const completeQuiz = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const userId = req.user.id;
		const chapterId = req.params.chapterId;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		let searchedCourseIndex = -1;
		for (let i = 0; i < profile.enroledCourses.length; i++) {
			if (profile.enroledCourses[i].courseId.toString() === courseId) {
				searchedCourseIndex = i;
			}
		}
		if (searchedCourseIndex === -1) {
			throw new CustomStatusCodeError(COURSE_NOT_FOUND, 404);
		}

		let quizScoreFound = -1;
		for (
			let i = 0;
			i < profile.enroledCourses[searchedCourseIndex].quizScores.length;
			i++
		) {
			if (
				profile.enroledCourses[searchedCourseIndex].quizScores[
					i
				].chapterId.toString() === chapterId
			) {
				quizScoreFound = i;
				break;
			}
		}
		const newScore = {
			chapterId: chapterId,
			quizScore: req.body.quizScore,
		};

		if (quizScoreFound === -1) {
			profile.enroledCourses[searchedCourseIndex].quizScores.unshift(newScore);
		} else {
			profile.enroledCourses[searchedCourseIndex].quizScores[quizScoreFound] =
				newScore;
		}

		await profile.save();
		return res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addAboutSection = async (req, res) => {
	try {
		const userId = req.user.id;
		const profile = await Profile.findOne({ user: userId });
		const data = req.body;
		const { website, status, skills, bio } = data;
		const newAbout = { website, status, bio };

		newAbout.skills = skills.split(",").map((skill) => skill.trim());
		profile.about = newAbout;
		await profile.save();
		res.status(200).json({ msg: ABOUT_SAVED });
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addGithubName = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId });
		profile.githubusername = data.githubusername;
		await profile.save();
		res.status(200).json({ msg: GITHUBUSERNAME_SAVED });
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addSocialSection = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;

		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { youtube, twitter, facebook, linkedin, instagram } = data;

		const socialSection = { youtube, twitter, facebook, linkedin, instagram };
		profile.social = socialSection;
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addExperience = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { title, company, location, from, to, current, description } = data;

		const newExperience = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		profile.experience.unshift(newExperience);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const editExperience = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { title, company, location, from, to, current, description } = data;

		const newExperience = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		const expId = req.params.exp_id;
		let expIndex = -1;
		for (let i = 0; i < profile.experience.length; i++) {
			if (profile.experience[i]._id.toString() === expId) {
				expIndex = i;
			}
		}
		if (expIndex === -1) {
			throw new CustomStatusCodeError(EXPERIENCE_NOT_FOUND, 404);
		}
		profile.experience[expIndex] = newExperience;
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteExperience = async (req, res) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);

		//get index of the experience
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		if (removeIndex < 0) {
			throw new CustomStatusCodeError(EXPERIENCE_NOT_FOUND, 404);
		}
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addEducation = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { school, degree, fieldofstudy, from, to, current, description } =
			data;

		const newEducation = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};
		profile.education.unshift(newEducation);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const editEducation = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { school, degree, fieldofstudy, from, to, current, description } =
			data;

		const newEducation = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};
		const eduId = req.params.edu_id;
		let eduIndex = -1;
		for (let i = 0; i < profile.education.length; i++) {
			if (profile.education[i]._id.toString() === eduId) {
				eduIndex = i;
			}
		}
		if (eduIndex === -1) {
			throw new CustomStatusCodeError(EDUCATION_NOT_FOUND, 404);
		}
		profile.education[eduIndex] = newEducation;
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteEducation = async (req, res) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);

		//get index of the experience
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		if (removeIndex < 0) {
			throw new CustomStatusCodeError(EDUCATION_NOT_FOUND, 404);
		}
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const completeCourse = async (req, res) => {
	try {
		const userId = req.user.id;
		const courseId = req.params.courseId;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);

		const searchedCourse = profile.enroledCourses.filter(
			(item) => item.courseId.toString() === courseId
		);
		if (!searchedCourse[0]) {
			throw new CustomStatusCodeError(NOT_ENROLLED, 404);
		}

		if (
			searchedCourse[0].numOfChapters !==
			searchedCourse[0].completedChapters.length
		) {
			throw new CustomStatusCodeError(NEED_TO_COMPLETE_CHAPTERS, 404);
		}
		profile.enroledCourses.map((item) => {
			if (item.courseId.toString() === courseId) {
				item.finished = true;
			}
		});
		profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

//|----------------|
//|---Functions----|
//|----------------|

async function verifyIfProfileExist(userId) {
	const profileExist = await Profile.findOne({ user: userId });
	if (profileExist) {
		throw new CustomStatusCodeError(PROFILE_EXIST, 400);
	}
}
async function verifyIfProfileDoesNotExist(userId) {
	const profileExist = await Profile.findOne({ user: userId });
	if (!profileExist) {
		throw new CustomStatusCodeError(PROFILE_NOT_FOUND, 400);
	}
}
export {
	getMyProfile,
	getProfileById,
	createProfile,
	addAboutSection,
	addGithubName,
	addSocialSection,
	addExperience,
	editExperience,
	deleteExperience,
	addEducation,
	editEducation,
	deleteEducation,
	enroleToCourse,
	completeChapter,
	completeQuiz,
	completeCourse,
};
