import axiosInstance from "../Axios/AxiosInstance";
import { IUserState } from "../Interfaces";
import { getToken } from "../Utils/utilFunctions";
import {
	CREATE_PROFILE_URL,
	LOAD_PROFILE_URL,
	UPDATE_GITHUB_URL,
} from "./apiPaths";
import { REQUEST_HEADERS_WITH_BEARER } from "./requestHeaders";

export const createProfile = (token: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			};

			const res = await axiosInstance.post(
				CREATE_PROFILE_URL,
				{},
				requestHeader
			);
			resolve(res.data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const loadProfile = (token: string) => {
	return new Promise<IUserState>(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(LOAD_PROFILE_URL, requestHeader);
			const { data }: { data: IUserState } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const updateGithub = (githubusername: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const git = { githubusername };

			const res = await axiosInstance.put(
				UPDATE_GITHUB_URL,
				git,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
