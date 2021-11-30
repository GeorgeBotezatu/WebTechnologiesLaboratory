import express from "express";
const router = express.Router();
import { check } from "express-validator";
import { registerUser } from "../controllers/userController.js";
import { validateUserRegister } from "../middleware/userMiddleware.js";
import { EMAIL, NAME, PASSWORD } from "../utils/constants.js";
import {
	NAME_REQUIRE,
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

router.post("/login", []);

export default router;
