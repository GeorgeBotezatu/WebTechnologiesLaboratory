import { validationResult } from "express-validator";
import CustomStatusCodeError from "../utils/customError.js";
import { matchInputs, verifyInputErrors } from "../utils/utilFunctions.js";

const validateCreatePost = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const data = req.body;
		const validInputs = { text: "", category: "" };
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

const validateCreateComment = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		verifyInputErrors(errors);
		const data = req.body;
		const validInputs = { text: "" };
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

export { validateCreatePost, validateCreateComment };
