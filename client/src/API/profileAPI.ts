import axiosInstance from "../Axios/AxiosInstance";
import { IUserState } from "../Interfaces";

import {
	CREATE_PROFILE_URL,
	EDUCATION_URLS,
	EXPERIENCE_URLS,
	LOAD_PROFILE_URL,
	SOCIAL_URLS,
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

interface educationData {
	school?: string;
	current?: boolean;
	description?: string;
	from?: Date | string;
	degree?: string;
	fieldofstudy?: string;
	to?: string | Date;
}
interface socialData {
	facebook?: string;
	youtube?: string;
	twitter?: string;
	linkedin?: string;
	instagram?: string;
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

export const editEducation = (eduData: educationData, id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = EDUCATION_URLS + `/${id}`;
			const res = await axiosInstance.put(
				url,
				eduData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
export const createEducation = (eduData: educationData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.put(
				EDUCATION_URLS,
				eduData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const deleteEdu = (id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.delete(
				EDUCATION_URLS + `/${id}`,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const editSocial = (socialData: socialData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const url = SOCIAL_URLS;
			const res = await axiosInstance.put(
				url,
				socialData,
				REQUEST_HEADERS_WITH_BEARER
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
