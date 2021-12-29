import jwt from "jsonwebtoken";
import { TOKEN_INVALID, TOKEN_REQUIRED } from "../utils/textUtils.js";

const auth = (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded.user;
			res.locals.user = decoded.user;
			next();
		}
		if (!token) {
			return res.status(403).json({ msg: TOKEN_REQUIRED });
		}
	} catch (error) {
		console.error(error.message);
		return res.status(400).json({ msg: TOKEN_INVALID });
	}
};

export { auth };
