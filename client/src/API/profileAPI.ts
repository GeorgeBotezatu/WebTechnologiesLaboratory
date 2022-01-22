import axiosInstance from "../Axios/AxiosInstance";
import { IUserState } from "../Interfaces";

import {
	CREATE_PROFILE_URL,
	EXPERIENCE_URLS,
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

interface experienceData {
	title?: string;
	company?: string;
	location?: string | null;
	from?: string | Date;
	to?: string | null | Date;
	current?: boolean;
	description?: string | null;
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

export const editExperience = (expData: experienceData, id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = EXPERIENCE_URLS + `/${id}`;
			const res = await axiosInstance.put(
				url,
				expData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
export const createExperience = (expData: experienceData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.put(
				EXPERIENCE_URLS,
				expData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const deleteExp = (id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.delete(
				EXPERIENCE_URLS + `/${id}`,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
