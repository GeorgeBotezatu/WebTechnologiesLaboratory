import jwt from "jsonwebtoken";
import { TOKEN_INVALID, TOKEN_REQUIRED } from "../utils/textUtils.js";

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

export { auth };
