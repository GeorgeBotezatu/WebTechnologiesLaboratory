import { validationResult } from "express-validator";
import CustomStatusCodeError from "../utils/customError.js";
import {
	SERVER_ERROR,
	USER_EXIST,
	USER_NOT_FOUND,
} from "../utils/textUtils.js";
import User from "../models/userScehma.js";
import { matchInputs, verifyInputErrors } from "../utils/utilFunctions.js";
//|----------------|
//|---Middlewares--|
//|----------------|
const validateUserRegister = async (req, res, next) => {
	try {
		const data = req.body;
		const errors = validationResult(req);
		const { email } = data;
		const validUserInputs = {
			name: "",
			email: "",
			password: "",
		};
		matchInputs(data, validUserInputs);
		await validateRegistration(email, errors);
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		return res.status(500).json({ msg: SERVER_ERROR });
	}
};

const validateUserLogin = async (req, res, next) => {
	try {
		const data = req.body;
		const { email } = data;
		const errors = validationResult(req);
		const validUserInputs = {
			email: "",
			password: "",
		};
		matchInputs(data, validUserInputs);
		verifyInputErrors(errors);
		await verifyIfUserExist(email);
		next();
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		return res.status(500).json({ msg: SERVER_ERROR });
	}
};

//|----------------|
//|---Functions----|
//|----------------|
async function validateRegistration(email, errors) {
	verifyInputErrors(errors);
	const user = await User.findOne({ email });
	if (user) {
		throw new CustomStatusCodeError(USER_EXIST, 400);
	}
}

async function verifyIfUserExist(email) {
	const user = await User.findOne({ email });
	if (!user) throw new CustomStatusCodeError(USER_NOT_FOUND, 404);
}
export { validateUserRegister, validateUserLogin };
