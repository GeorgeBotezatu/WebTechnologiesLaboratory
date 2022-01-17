import Profile from "../models/profileSchema.js";
import CustomStatusCodeError from "../utils/customError.js";
import {
	ABOUT_SAVED,
	EDUCATION_DELETED,
	EDUCATION_NOT_FOUND,
	EDUCATION_SAVED,
	EXPERIENCE_DELETED,
	EXPERIENCE_NOT_FOUND,
	EXPERIENCE_SAVED,
	GITHUBUSERNAME_SAVED,
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
			["name", "avatar", "email"]
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

		const profile = await Profile.findOne({ user: userId });
		const { youtube, twitter, facebook, linkedin, instagram } = data;

		const socialSection = { youtube, twitter, facebook, linkedin, instagram };
		profile.social = socialSection;
		await profile.save();
		res.status(200).json({ msg: SOCIAL_SAVED });
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
		const profile = await Profile.findOne({ user: userId });
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

const deleteExperience = async (req, res) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const profile = await Profile.findOne({ user: userId });

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
		const profile = await Profile.findOne({ user: userId });
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

const deleteEducation = async (req, res) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const profile = await Profile.findOne({ user: userId });

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
	createProfile,
	addAboutSection,
	addGithubName,
	addSocialSection,
	addExperience,
	deleteExperience,
	addEducation,
	deleteEducation,
};
