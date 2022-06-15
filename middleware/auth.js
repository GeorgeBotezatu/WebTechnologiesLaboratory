import jwt from "jsonwebtoken";
import {
	NOT_ADMIN,
	TOKEN_INVALID,
	TOKEN_REQUIRED,
} from "../utils/textUtils.js";
import User from "../models/userScehma.js";

const auth = (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded.user;
			res.locals.user = decoded.user;
			next();
		} catch (error) {
			console.error(error.message);
			return res.status(400).send({ errors: [{ msg: TOKEN_INVALID }] });
		}
	}
	if (!token) {
		return res.status(403).json({ errors: [{ msg: TOKEN_REQUIRED }] });
	}
};
const admin = async (req, res, next) => {
	try {
		const loggedUser = await User.findById(res.locals.user.id);
		if (loggedUser.isAdmin === true) {
			next();
		} else {
			return res.status(401).json({ errors: [{ msg: NOT_ADMIN }] });
		}
	} catch (error) {}
};

export { auth, admin };
