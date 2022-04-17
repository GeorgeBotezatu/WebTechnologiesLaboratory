//|----------------|
//|---Middleware---|

import { validationResult } from "express-validator";
import CustomStatusCodeError from "../utils/customError.js";
import { SERVER_ERROR } from "../utils/textUtils.js";
import {
	matchInputs,
	verifyIfProfileDoesNotExist,
	verifyInputErrors,
} from "../utils/utilFunctions.js";

//|----------------|
const validateSaveOnProfile = async (req, res, next) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const data = req.body;
		const validInputs = { name: "", js: "", css: "", html: "" };
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

export { validateSaveOnProfile };
