import Cookies from "universal-cookie";
import { TOKEN } from "../Utils/constants";
const cookies = new Cookies();
export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const addTokenToCookie = (token: string) => {
	const date = new Date();
	date.setTime(date.getTime() + 36000000);
	console.log(date);
	cookies.set(TOKEN, token, {
		path: "/",
		expires: date,
	});
};

export const getToken = () => {
	return cookies.get(TOKEN);
};
