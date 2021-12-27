import express from "express";
const router = express.Router();
import { check } from "express-validator";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
	validateUserLogin,
	validateUserRegister,
} from "../middleware/userMiddleware.js";
import { EMAIL, NAME, PASSWORD } from "../utils/constants.js";
import {
	NAME_REQUIRE,
	PASSWORD_REQUIRED,
	VALID_EMAIL,
	VALID_PASSWORD,
} from "../utils/textUtils.js";

//@roaute POST api/user
//@desc   Authenticate user & get token
//@access Public
router.post(
	"/",
	[
		check(NAME, NAME_REQUIRE).not().isEmpty(),
		check(EMAIL, VALID_EMAIL).isEmail(),
		check(PASSWORD, VALID_PASSWORD).isLength({ min: 6 }),
	],
	validateUserRegister,
	registerUser
);
//@roaute POST api/user/login
//@desc   Authenticate user & get token
//@access Public
router.post("/login", [
	check(EMAIL, VALID_EMAIL),
	check(PASSWORD, PASSWORD_REQUIRED),
	validateUserLogin,
	loginUser,
]);

export default router;
