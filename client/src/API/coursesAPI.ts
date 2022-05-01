import axiosInstance from "../Axios/AxiosInstance";
import { ICoursesList } from "../Interfaces";
import { GET_COURSES_LIST } from "./apiPaths";
import { REQUEST_HEADERS_WITH_BEARER } from "./requestHeaders";

export const getCoursesList = () => {
	return new Promise(async (resolve, reject) => {
		const res = await axiosInstance.get(
			GET_COURSES_LIST,
			REQUEST_HEADERS_WITH_BEARER
		);
		const { data }: { data: ICoursesList } = res;
		resolve(data);
		try {
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
