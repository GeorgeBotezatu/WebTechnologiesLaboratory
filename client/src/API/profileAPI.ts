import axiosInstance from "../Axios/AxiosInstance";
import { IUserState } from "../Interfaces";
import { getToken } from "../Utils/utilFunctions";

import {
	CREATE_PROFILE_URL,
	EDUCATION_URLS,
	EXPERIENCE_URLS,
	LOAD_PROFILE_URL,
	PROFILE_URL,
	SOCIAL_URLS,
	UPDATE_ABOUT_URL,
	UPDATE_GITHUB_URL,
} from "./apiPaths";

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

export const loadProfileById = (userId: string) => {
	return new Promise<IUserState>(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(
				PROFILE_URL + `/${userId}`,
				requestHeader
			);
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				UPDATE_GITHUB_URL,
				git,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				UPDATE_ABOUT_URL,
				aboutData,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const url = EXPERIENCE_URLS + `/${id}`;
			const res = await axiosInstance.put(url, expData, requestHeader);

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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				EXPERIENCE_URLS,
				expData,
				requestHeader
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const enrolCourse = (courseId: String) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};

			const res = await axiosInstance.put(
				`profile/enroll/${courseId}`,
				{},
				requestHeader
			);

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const completeCourseChapter = (courseId: String, chapterId: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};

			const res = await axiosInstance.put(
				`profile/enroll/${courseId}/chapter/${chapterId}`,
				{},
				requestHeader
			);

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const completeCourseChapterQuiz = (
	courseId: string,
	chapterId: string,
	quizScore: number
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};

			const res = await axiosInstance.put(
				`profile/enroll/${courseId}/chapter/${chapterId}/complete-quiz`,
				{ quizScore: quizScore.toString() },
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				EXPERIENCE_URLS + `/${id}`,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const url = EDUCATION_URLS + `/${id}`;
			const res = await axiosInstance.put(url, eduData, requestHeader);
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				EDUCATION_URLS,
				eduData,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				EDUCATION_URLS + `/${id}`,
				requestHeader
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
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const url = SOCIAL_URLS;
			const res = await axiosInstance.put(url, socialData, requestHeader);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
