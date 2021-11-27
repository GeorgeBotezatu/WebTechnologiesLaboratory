import express from "express";
const router = express.Router();
import { check } from "express-validator";
import { registerUser } from "../controllers/userController.js";
import { EMAIL, NAME, PASSWORD } from "../utils/constants.js";
import {
	NAME_REQUIRE,
	VALID_EMAIL,
	VALID_PASSWORD,
} from "../utils/textUtils.js";

router.post(
	"/",
	[
		check(NAME, NAME_REQUIRE).not().isEmpty(),
		check(EMAIL, VALID_EMAIL).isEmail(),
		check(PASSWORD, VALID_PASSWORD).isLength({ min: 6 }),
	],
	registerUser
);

export default router;
