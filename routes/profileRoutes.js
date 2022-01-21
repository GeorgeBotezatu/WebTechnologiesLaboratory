import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
	addAboutSection,
	addEducation,
	addExperience,
	addGithubName,
	addSocialSection,
	createProfile,
	deleteEducation,
	deleteExperience,
	editEducation,
	editExperience,
	getMyProfile,
} from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";
import {
	validateAddAboutSection,
	validateAddGithubName,
	validateEducation,
	validateExperience,
	validateSocialSection,
} from "../middleware/profileMiddleware.js";
import {
	COMPANY,
	DEGREE,
	FIELD_OF_STUDY,
	FROM,
	GITHUB,
	SCHOOL,
	SKILLS,
	STATUS,
	TITLE,
} from "../utils/constants.js";
import {
	COMPANY_REQUIRED,
	DEGREE_REQUIRED,
	FIELD_OF_STUDY_REQUIRED,
	FROM_REQUIRED,
	GITHUB_REQUIRED,
	SCHOOL_REQUIRED,
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

//@roaute POST api/profile/experience/:exp_id
//@desc   editexperience section
//@access private
router.put(
	"/experience/:exp_id",
	auth,
	[
		check(TITLE, TITLE_REQUIRED).not().isEmpty(),
		check(COMPANY, COMPANY_REQUIRED).not().isEmpty(),
		check(FROM, FROM_REQUIRED).not().isEmpty(),
	],
	validateExperience,
	editExperience
);

//@roaute DELETE api/profile/experience/:exp_id
//@desc   Delete education
//@access private
router.delete("/experience/:exp_id", auth, deleteExperience);

//@roaute POST api/profile/education
//@desc   Create education section
//@access private
router.put(
	"/education",
	auth,
	[
		check(SCHOOL, SCHOOL_REQUIRED).not().isEmpty(),
		check(DEGREE, DEGREE_REQUIRED).not().isEmpty(),
		check(FIELD_OF_STUDY, FIELD_OF_STUDY_REQUIRED).not().isEmpty(),
		check(FROM, FROM_REQUIRED).not().isEmpty(),
	],
	validateEducation,
	addEducation
);

//@roaute POST api/profile/education:edu_id
//@desc Edit education section
//@access private
router.put(
	"/education",
	auth,
	[
		check(SCHOOL, SCHOOL_REQUIRED).not().isEmpty(),
		check(DEGREE, DEGREE_REQUIRED).not().isEmpty(),
		check(FIELD_OF_STUDY, FIELD_OF_STUDY_REQUIRED).not().isEmpty(),
		check(FROM, FROM_REQUIRED).not().isEmpty(),
	],
	validateEducation,
	editEducation
);

//@roaute DELETE api/profile/education/:edu_id
//@desc   DELETE education
//@access private
router.delete("/education/:edu_id", auth, deleteEducation);
export default router;
