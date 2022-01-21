import User from "../models/userScehma.js";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import CustomStatusCodeError from "../utils/customError.js";
import {
	INVALID_CREDENTIALS,
	SERVER_ERROR,
	TOKEN_ERROR,
} from "../utils/textUtils.js";

//|----------------|
//|---Controllers--|
//|----------------|
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const avatar = gravatar.url(email, {
			s: "200",
			r: "pg",
			d: "mm",
		});
		const newEmail = email.toLowerCase();
		const user = new User({ name, newEmail, avatar, password });

		user.password = await encryptPassword(password);
		await user.save();
		generateToken(user, res);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		return res.status(500).json({ msg: SERVER_ERROR });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const newEmail = email.toLowerCase();
		const user = await User.findOne({ newEmail });
		await validatePassword(password, user.password);
		generateToken(user, res);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		return res.status(500).json({ msg: SERVER_ERROR });
	}
};

//|----------------|
//|---Functions----|
//|----------------|
async function encryptPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

async function validatePassword(password, userPassword) {
	const isMatch = await bcrypt.compare(password, userPassword);
	if (!isMatch) {
		throw new CustomStatusCodeError(INVALID_CREDENTIALS, 400);
	}
}

function generateToken(user, res) {
	const payload = {
		user: {
			id: user.id,
		},
	};
	jwt.sign(
		payload,
		process.env.JWT_SECRET,
		{ expiresIn: 36000 },
		(err, token) => {
			if (err) throw new CustomStatusCodeError(TOKEN_ERROR, 400);
			return res.status(200).json({ token: token });
		}
	);
}
export { registerUser, loginUser };
