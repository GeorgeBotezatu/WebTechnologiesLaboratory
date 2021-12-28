import CustomStatusCodeError from "./customError.js";
import { INPUTS_DOES_NOT_MATCH } from "./textUtils.js";

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

export { matchInputs, verifyInputErrors };
