import axiosInstance from "../Axios/AxiosInstance";
import {
	ICourse,
	ICourseChapterQuizArr,
	ICoursesList,
	ICoursesListItem,
	IUserState,
} from "../Interfaces";
import { getToken } from "../Utils/utilFunctions";
import { COURSES_URL, GET_COURSES_LIST } from "./apiPaths";

export const getCoursesList = (token: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(GET_COURSES_LIST, requestHeader);
			const { data }: { data: ICoursesList } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const createCourse = (formData: ICoursesListItem) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.post(
				COURSES_URL + "/create",
				{
					courseTitle: formData.courseTitle,
					courseDescription: formData.courseDescription,
				},
				requestHeader
			);
			const { data }: { data: ICoursesList } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const updateCourse = (formData: ICoursesListItem) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				COURSES_URL + `/${formData._id}`,
				{
					courseTitle: formData.courseTitle,
					courseDescription: formData.courseDescription,
				},
				requestHeader
			);
			const { data }: { data: ICoursesList } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const loadCourse = (courseId: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(
				COURSES_URL + `/${courseId}`,
				requestHeader
			);
			const { data }: { data: ICourse } = res;

			resolve(data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const createChapter = (
	chapterTitle: string,
	content: string,
	courseId: string
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const reqData = {
				chapterTitle: chapterTitle,
				content: content,
			};
			const res = await axiosInstance.put(
				COURSES_URL + `/create/${courseId}/chapter`,
				reqData,
				requestHeader
			);
			const { data }: { data: ICourse } = res;
			resolve(data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const updateChapter = (
	chapterTitle: string,
	content: string,
	courseId: string,
	chapterId: string
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const reqData = {
				chapterTitle: chapterTitle,
				content: content,
			};
			const res = await axiosInstance.put(
				COURSES_URL + `/create/${courseId}/chapter/${chapterId}`,
				reqData,
				requestHeader
			);
			const { data }: { data: ICourse } = res;
			resolve(data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const deleteCourse = (courseId: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				COURSES_URL + `/${courseId}`,
				requestHeader
			);
			const { data }: { data: ICourse } = res;
			resolve(data);
		} catch (error) {
			reject(error);
			console.log(error);
		}
	});
};

export const createQuiz = (
	courseId: string,
	chapterId: string,
	quiz: ICourseChapterQuizArr
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
				COURSES_URL + `/create/${courseId}/chapter/${chapterId}/quiz`,
				{ quiz: quiz },
				requestHeader
			);
			const { data }: { data: ICourse } = res;
			resolve(data);
		} catch (error) {
			reject(error);
			console.log(error);
		}
	});
};

export const deleteChpater = (courseId: string, chapterId: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				COURSES_URL + `/${courseId}/chapter/${chapterId}`,
				requestHeader
			);
			const { data }: { data: ICourse } = res;
			resolve(data);
		} catch (error) {
			reject(error);
			console.log(error);
		}
	});
};

export const changeChapterOrder = (
	courseId: string,
	chapterId: string,
	order: number
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
				COURSES_URL + `/${courseId}/chapter/${chapterId}/order`,
				{ newOrder: order },
				requestHeader
			);

			const { data }: { data: ICourse } = res;
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const finishCourse = (_id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				`/profile/enroll/${_id}/finish`,
				{},
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
