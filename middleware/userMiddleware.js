import { validationResult } from "express-validator";
import CustomStatusCodeError from "../utils/customError.js";
import { SERVER_ERROR, USER_EXIST } from "../utils/textUtils.js";
import User from "../models/userScehma.js";

const validateUserRegister = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		const email = req.body.email;
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

async function validateRegistration(email, errors) {
	if (!errors.isEmpty()) {
		throw new CustomStatusCodeError(errors.array(), 400);
	}

	const user = await User.findOne({ email });
	if (user) {
		throw new CustomStatusCodeError(USER_EXIST, 400);
	}
}

export { validateUserRegister };
