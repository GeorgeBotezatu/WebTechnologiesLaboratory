import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
	deleteConsole,
	saveOnProfile,
	updateConsoleOnProfile,
} from "../controllers/consoleController.js";
import { auth } from "../middleware/auth.js";
import { validateSaveOnProfile } from "../middleware/consoleMiddleware.js";
import { NAME } from "../utils/constants.js";
import { NAME_REQUIRE } from "../utils/textUtils.js";

//@roaute PUT api/console/save-on-profile
//@desc   add code saves on profile
//@access private
router.put(
	"/save-on-profile",
	auth,
	[check(NAME, NAME_REQUIRE)],
	validateSaveOnProfile,
	saveOnProfile
);

//@roaute PUT api/console/save-on-profile
//@desc   update code saves on profile
//@access private
router.put("/save-on-profile/:save_id", auth, updateConsoleOnProfile);

//@roaute DELETE api/console/save-on-profile
//@desc   Delete a code Save
//@access private
router.delete("/save-on-profile/:save_id", auth, deleteConsole);

export default router;
