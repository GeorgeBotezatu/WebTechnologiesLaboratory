import axiosInstance from "../Axios/AxiosInstance";
import { addTokenToCookie } from "../Utils/utilFunctions";
import { REGISTER_URL } from "./apiPaths";

interface IData {
	name: string;
	email: string;
	password: string;
}
export const userRegister = (data: IData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.post(REGISTER_URL, data);
			resolve(res.data);
			addTokenToCookie(res.data.token);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
