import CustomStatusCodeError from "../utils/customError.js";
import {
	END_DATE_IN_PAST,
	FROM_DATE_FUTURE,
	SERVER_ERROR,
} from "../utils/textUtils.js";
import { validationResult } from "express-validator";
import {
	matchInputs,
	verifyIfProfileDoesNotExist,
	verifyInputErrors,
} from "../utils/utilFunctions.js";

//|----------------|
//|---Middleware---|
//|----------------|
const validateAddAboutSection = async (req, res, next) => {
	try {
		const userId = req.user.id;

		await verifyIfProfileDoesNotExist(userId);
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const data = req.body;

		const validInputs = { website: "", status: "", skills: "", bio: "" };
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

const validateAddGithubName = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);

		const data = req.body;
		const validInput = { githubusername: "" };
		matchInputs(data, validInput);
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const validateSocialSection = async (req, res, next) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const data = req.body;
		const validInputs = {
			youtube: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			instagram: "",
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

const validateExperience = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const data = req.body;
		const validInputs = {
			title: "",
			company: "",
			location: "",
			from: "",
			to: "",
			current: "",
			description: "",
		};
		matchInputs(data, validInputs);
		verifyDates(data);
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const validateEducation = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const data = req.body;
		const validInputs = {
			school: "",
			degree: "",
			fieldofstudy: "",
			from: "",
			to: "",
			current: "",
			description: "",
		};
		matchInputs(data, validInputs);
		verifyDates(data);
		next();
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

function verifyDates(data) {
	const today = new Date();
	const fromDate = new Date(data.from);
	if (today.getTime() < fromDate.getTime()) {
		throw new CustomStatusCodeError(FROM_DATE_FUTURE, 400);
	}
	if (data.to) {
		const toDate = new Date(data.to);
		if (toDate.getTime() < fromDate.getTime()) {
			throw new CustomStatusCodeError(END_DATE_IN_PAST, 400);
		}
	}
}

export {
	validateAddAboutSection,
	validateAddGithubName,
	validateSocialSection,
	validateExperience,
	validateEducation,
};
