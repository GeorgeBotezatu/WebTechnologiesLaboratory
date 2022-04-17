import axiosInstance from "../Axios/AxiosInstance";
import { CONSOLE_URLS } from "./apiPaths";
import { REQUEST_HEADERS_WITH_BEARER } from "./requestHeaders";

export interface IConsoleData {
	name: string;
	js: string;
	css: string;
	html: string;
}

export const deleteCodeSaves = (id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.delete(
				CONSOLE_URLS + `/${id}`,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
export const createConsole = (consoleData: IConsoleData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.put(
				CONSOLE_URLS,
				consoleData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
export const updateConsole = (consoleData: IConsoleData, id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = CONSOLE_URLS + `/${id}`;
			const res = await axiosInstance.put(
				url,
				consoleData,
				REQUEST_HEADERS_WITH_BEARER
			);

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
