import axiosInstance from "../Axios/AxiosInstance";
import { addTokenToCookie } from "../Utils/utilFunctions";
import { LOGIN_URL } from "./apiPaths";

interface IData {
	email: string;
	password: string;
}
export const userLogin = (data: IData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.post(LOGIN_URL, data);
			resolve(res.data);
			addTokenToCookie(res.data.token);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
