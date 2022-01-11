import axiosInstance from "../Axios/AxiosInstance";
import { IUserState } from "../Interfaces";

import {
	CREATE_PROFILE_URL,
	LOAD_PROFILE_URL,
	UPDATE_ABOUT_URL,
	UPDATE_GITHUB_URL,
} from "./apiPaths";
import { REQUEST_HEADERS_WITH_BEARER } from "./requestHeaders";

interface aboutData {
	bio: string;
	skills: string;
	status: string;
	website: string;
}

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

export const updateAbout = (aboutData: aboutData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.put(
				UPDATE_ABOUT_URL,
				aboutData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
