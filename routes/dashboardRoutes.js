import express from "express";
const router = express.Router();
import { check } from "express-validator";

import {
	addNewProblem,
	deleteProblem,
	getAllProblems,
	getLatestData,
} from "../controllers/dashboardController.js";
import { admin, auth } from "../middleware/auth.js";

import { DESCRIPTION } from "../utils/constants.js";
import { DESCRIPTION_REQUIRED } from "../utils/textUtils.js";

//@roaute POST api/dashboard/problem
//@desc   report a problem
//@access private
router.post(
	"/problem",
	auth,
	admin,
	[check(DESCRIPTION, DESCRIPTION_REQUIRED)],
	addNewProblem
);

//@roaute POST api/dashboard/latest
//@desc  get dashboard latest info
//@access private/ADMIN
router.get("/latest", auth, admin, getLatestData);

//@roaute GET api/dashboard/problem
//@desc   get all problems
//@access private
router.get("/problem", auth, admin, getAllProblems);

//@roaute delete api/dashboard/problem/:problemId
//@desc   delete problem
//@access private
router.delete("/problem/:problemId", auth, admin, deleteProblem);

export default router;
