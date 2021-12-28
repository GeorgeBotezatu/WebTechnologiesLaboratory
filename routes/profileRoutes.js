import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
	addAboutSection,
	addExperience,
	addGithubName,
	addSocialSection,
	createProfile,
	getMyProfile,
} from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";
import {
	validateAddAboutSection,
	validateAddGithubName,
	validateExperience,
	validateSocialSection,
} from "../middleware/profileMiddleware.js";
import {
	COMPANY,
	FROM,
	GITHUB,
	SKILLS,
	STATUS,
	TITLE,
} from "../utils/constants.js";
import {
	COMPANY_REQUIRED,
	FROM_REQUIRED,
	GITHUB_REQUIRED,
	SKILLS_REQUIRED,
	STATUS_REQUIRED,
	TITLE_REQUIRED,
} from "../utils/textUtils.js";

//@roaute GET api/profile/me
//@desc   get my profile
//@access private
router.get("/me", auth, getMyProfile);

//@roaute POST api/profile/create
//@desc   create my profile
//@access private
router.post("/create", auth, createProfile);

//@roaute POST api/profile/about
//@desc   create about section
//@access private
router.put(
	"/about",
	auth,
	[
		check(STATUS, STATUS_REQUIRED).not().isEmpty(),
		check(SKILLS, SKILLS_REQUIRED).not().isEmpty(),
	],
	validateAddAboutSection,
	addAboutSection
);

//@roaute POST api/profile/github
//@desc   add github username
//@access private
router.put(
	"/github",
	auth,
	[check(GITHUB, GITHUB_REQUIRED).not().isEmpty()],
	validateAddGithubName,
	addGithubName
);

//@roaute POST api/profile/social
//@desc   Create social section
//@access private
router.put("/social", auth, validateSocialSection, addSocialSection);

//@roaute POST api/profile/experience
//@desc   Create experience section
//@access private

router.put(
	"/experience",
	auth,
	[
		check(TITLE, TITLE_REQUIRED).not().isEmpty(),
		check(COMPANY, COMPANY_REQUIRED).not().isEmpty(),
		check(FROM, FROM_REQUIRED).not().isEmpty(),
	],
	validateExperience,
	addExperience
);

export default router;
