import axiosInstance from "../Axios/AxiosInstance";
import { addTokenToCookie } from "../Utils/utilFunctions";
const loginUrl = "/user/login";
interface IData {
	email: string;
	password: string;
}
export const userLogin = (data: IData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.post(loginUrl, data);
			resolve(res.data);
			addTokenToCookie(res.data.token);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
