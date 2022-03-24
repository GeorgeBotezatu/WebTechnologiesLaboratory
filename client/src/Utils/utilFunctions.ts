import Cookies from "universal-cookie";
import { TOKEN } from "../Utils/constants";
const cookies = new Cookies();
export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const addTokenToCookie = (token: string) => {
	const date = new Date();
	date.setTime(date.getTime() + 36000000);

	cookies.set(TOKEN, token, {
		path: "/",
		expires: date,
	});
};

export const getToken = () => {
	return cookies.get(TOKEN);
};
export const existToken = () => {
	const token: string = getToken();
	if (token) return true;
	else return false;
};
export const deleteCookie = () => {
	cookies.remove(TOKEN);
};

export const calcultateDays = (profileDate: Date | null) => {
	if (profileDate) {
		const date = new Date(profileDate);
		const today = new Date();
		const diffTIme = today.getTime() - date.getTime();
		const diffDays = Math.round(diffTIme / (1000 * 3600 * 24));
		return diffDays;
	}
};
