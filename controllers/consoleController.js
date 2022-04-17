import Profile from "../models/profileSchema.js";
import CustomStatusCodeError from "../utils/customError.js";
import { CONSOLE_NOT_FOUND, SERVER_ERROR } from "../utils/textUtils.js";
import { verifyIfProfileDoesNotExist } from "../utils/utilFunctions.js";

//|----------------|
//|---Controllers--|
//|----------------|
const saveOnProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { name, js, css, html } = data;
		const newCodeSaves = {
			name,
			js,
			css,
			html,
		};
		profile.codeSaves.unshift(newCodeSaves);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const updateConsoleOnProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const data = req.body;
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);
		const { name, js, css, html } = data;
		const newCodeSaves = {
			name,
			js,
			css,
			html,
		};
		const saveId = req.params.save_id;
		let saveIndex = -1;
		for (let i = 0; i < profile.codeSaves.length; i++) {
			if (profile.codeSaves[i]._id.toString() === saveId) {
				saveIndex = i;
			}
		}
		if (saveIndex === -1) {
			throw new CustomStatusCodeError(CONSOLE_NOT_FOUND, 404);
		}

		profile.codeSaves[saveIndex] = newCodeSaves;
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};

const deleteConsole = async (req, res) => {
	try {
		const userId = req.user.id;
		await verifyIfProfileDoesNotExist(userId);
		const profile = await Profile.findOne({ user: userId }).populate("user", [
			"name",
			"avatar",
			"email",
			"isAdmin",
		]);

		const removeIndex = profile.codeSaves
			.map((item) => item.id)
			.indexOf(req.params.save_id);

		if (removeIndex < 0) {
			throw new CustomStatusCodeError(CONSOLE_NOT_FOUND, 404);
		}
		profile.codeSaves.splice(removeIndex, 1);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		if (error instanceof CustomStatusCodeError) {
			return res.status(error.statusCode).json({ msg: error.message });
		}
		console.log(error);
		res.status(500).send({ msg: SERVER_ERROR });
	}
};
export { saveOnProfile, updateConsoleOnProfile, deleteConsole };
