import Profile from "../models/profileSchema.js";
import CustomStatusCodeError from "./customError.js";
import { INPUTS_DOES_NOT_MATCH, PROFILE_NOT_FOUND } from "./textUtils.js";

function matchInputs(arrived, valid) {
	let counter = 0;
	for (let attr in valid) {
		for (let at in arrived)
			if (attr === at) {
				counter++;
			}
	}

	if (counter != Object.keys(valid).length) {
		throw new CustomStatusCodeError(INPUTS_DOES_NOT_MATCH, 400);
	}
}

function verifyInputErrors(errors) {
	if (!errors.isEmpty()) {
		throw new CustomStatusCodeError(errors.array(), 400);
	}
}

async function verifyIfProfileDoesNotExist(userId) {
	const profileExist = await Profile.findOne({ user: userId });
	if (!profileExist) {
		throw new CustomStatusCodeError(PROFILE_NOT_FOUND, 400);
	}
}
export { matchInputs, verifyInputErrors, verifyIfProfileDoesNotExist };
