import Post from "../models/postSchema.js";
import User from "../models/userScehma.js";
import CustomStatusCodeError from "../utils/customError.js";
import {
	COMMENT_NOT_FOUND,
	NOT_AUTHORIZED,
	POSTS_NOT_FOUND,
	POST_NOT_FOUND,
	SERVER_ERROR,
	USER_NOT_FOUND,
} from "../utils/textUtils.js";

//|----------------|
//|---Controllers--|
//|----------------|

const createPost = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			category: req.body.category.toLowerCase(),
			avatar: user.avatar,
			user: req.user.id,
		});
		const post = await newPost.save();
		res.status(200).json(post);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		if (!posts) {
			throw new CustomStatusCodeError(POSTS_NOT_FOUND, 404);
		}
		res.status(200).json(posts);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			throw new CustomStatusCodeError(POST_NOT_FOUND, 404);
		}
		res.status(200).json(post);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			throw new CustomStatusCodeError(POST_NOT_FOUND, 404);
		}
		const user = await User.findById(req.user.id);
		if (!user) {
			throw new CustomStatusCodeError(USER_NOT_FOUND, 404);
		}

		if (post.user.toString() === req.user.id || user.isAdmin === true) {
			await post.remove();
			const posts = await Post.find();
			res.status(200).json(posts);
		} else {
			throw new CustomStatusCodeError(NOT_AUTHORIZED, 401);
		}
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const likePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		//Check if the post has already been liked

		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			const removeIndex = post.likes
				.map((like) => like.user.toString())
				.indexOf(req.user.id);
			post.likes.splice(removeIndex, 1);
			await post.save();

			res.status(200).json(post);
		} else {
			post.likes.unshift({ user: req.user.id });
			await post.save();

			res.status(200).json(post);
		}
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const addComment = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		const post = await Post.findById(req.params.postId);

		const newComment = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id,
		};
		post.comments.unshift(newComment);
		await post.save();
		res.json(post);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteComment = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		const comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.commentId
		);

		if (!comment) {
			throw new CustomStatusCodeError(COMMENT_NOT_FOUND, 404);
		}
		const user = await User.findById(req.user.id);
		if (!user) {
			throw new CustomStatusCodeError(USER_NOT_FOUND, 404);
		}

		if (comment.user.toString() === req.user.id || user.isAdmin === true) {
			const removeIndex = post.comments
				.map((comment) => comment._id.toString())
				.indexOf(req.params.commentId);
			post.comments.splice(removeIndex, 1);

			await post.save();
			res.json(post);
		} else {
			throw new CustomStatusCodeError(NOT_AUTHORIZED, 401);
		}
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

export {
	createPost,
	getAllPosts,
	getPostById,
	deletePost,
	likePost,
	addComment,
	deleteComment,
};
