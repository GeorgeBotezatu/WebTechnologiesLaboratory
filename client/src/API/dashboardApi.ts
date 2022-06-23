import axiosInstance from "../Axios/AxiosInstance";
import { IDashboardStats, IProblem, IProblemArr } from "../Interfaces";

import { getToken } from "../Utils/utilFunctions";
import { DASHBOARD_URL } from "./apiPaths";

export const getProblemList = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(
				DASHBOARD_URL + "/problem",
				requestHeader
			);
			const { data }: { data: IProblemArr } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const addProblem = (description?: string, problemLink?: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.post(
				DASHBOARD_URL + "/problem",
				{
					description,
					problemLink,
				},
				requestHeader
			);
			const { data }: { data: IProblem } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const deleteProblem = (_id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				DASHBOARD_URL + `/problem/${_id}`,
				requestHeader
			);
			const { data }: { data: IProblem } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const getDashboardStats = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(
				DASHBOARD_URL + "/latest",
				requestHeader
			);
			const { data }: { data: IDashboardStats } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
