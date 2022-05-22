import axiosInstance from "../Axios/AxiosInstance";
import { getToken } from "../Utils/utilFunctions";
import { CONSOLE_URLS } from "./apiPaths";

export interface IConsoleData {
	name: string;
	js: string;
	css: string;
	html: string;
}

export const deleteCodeSaves = (id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				CONSOLE_URLS + `/${id}`,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				CONSOLE_URLS,
				consoleData,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const url = CONSOLE_URLS + `/${id}`;
			const res = await axiosInstance.put(url, consoleData, requestHeader);

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
