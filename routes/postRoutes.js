import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
	addComment,
	createPost,
	deleteComment,
	deletePost,
	getAllPosts,
	getPostById,
	likePost,
} from "../controllers/postController.js";
import { admin, auth } from "../middleware/auth.js";
import {
	validateCreateComment,
	validateCreatePost,
} from "../middleware/postMiddleware.js";
import { CATEGORY, TEXT } from "../utils/constants.js";
import {
	CATEGORY_REQUIRED,
	COMMENT_BODY_REQUIRED,
	POST_BODY_REQUIRED,
} from "../utils/textUtils.js";

//@roaute POST api/posts
//@desc   create a post
//@access Public
router.post(
	"/",
	auth,
	[
		check(TEXT, POST_BODY_REQUIRED).not().isEmpty(),
		check(CATEGORY, CATEGORY_REQUIRED).not().isEmpty(),
	],
	validateCreatePost,
	createPost
);

//@roaute GET api/posts
//@desc   Get all posts
//@access Public
router.get("/", getAllPosts);

//@roaute GET api/posts/:postId
//@desc   Get post by id
//@access Public
router.get("/:postId", auth, getPostById);

//@roaute Delete api/posts/:postId
//@desc   delete a post
//@access Private
router.delete("/:postId", auth, deletePost);

//@roaute PUT api/posts/like/:postId
//@desc   Like a post
//@access Private

router.put("/like/:postId", auth, likePost);

//@roaute POST api/posts/comment/:postId
//@desc  Comment to a post
//@access Private
router.post(
	"/comment/:postId",
	auth,
	[check(TEXT, COMMENT_BODY_REQUIRED).not().isEmpty()],
	validateCreateComment,
	addComment
);

//@roaute DELETE api/posts/comment/:id/:id_comment
//@desc  Delete comment
//@access Private
router.delete("/:postId/comment/:commentId", auth, deleteComment);

export default router;
