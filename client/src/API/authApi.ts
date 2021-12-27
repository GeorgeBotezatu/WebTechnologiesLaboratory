import axiosInstance from "../Axios/AxiosInstance";
import Cookies from "universal-cookie";
import { TOKEN } from "../Utils/constants";
const registerUrl = "/user";

export const userRegister = (data: {}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.post(registerUrl, data);
			resolve(res.data);
			const cookies = new Cookies();
			const date = new Date();
			date.setTime(date.getTime() + 36000000);
			console.log(date);
			cookies.set(TOKEN, res.data.token, {
				path: "/",
				expires: date,
			});
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
