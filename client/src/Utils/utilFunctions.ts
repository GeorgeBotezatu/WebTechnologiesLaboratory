import Cookies from "universal-cookie";
import { TOKEN } from "../Utils/constants";

export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const addTokenToCookie = (token: string) => {
	const cookies = new Cookies();
	const date = new Date();
	date.setTime(date.getTime() + 36000000);
	console.log(date);
	cookies.set(TOKEN, token, {
		path: "/",
		expires: date,
	});
};
