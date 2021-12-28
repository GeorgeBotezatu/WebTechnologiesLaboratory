import axiosInstance from "../Axios/AxiosInstance";
import { addTokenToCookie } from "../Utils/utilFunctions";

const registerUrl = "/user";
interface IData {
	name: string;
	email: string;
	password: string;
}
export const userRegister = (data: IData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.post(registerUrl, data);
			resolve(res.data);
			addTokenToCookie(res.data.token);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
