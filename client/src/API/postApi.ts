import axiosInstance from "../Axios/AxiosInstance";
import { IPost, IPostsArr } from "../Interfaces";
import { getToken } from "../Utils/utilFunctions";
import { POSTS_URL } from "./apiPaths";

export const getPostsList = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(POSTS_URL, requestHeader);
			const { data }: { data: IPostsArr } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const getPost = (_id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(POSTS_URL + `/${_id}`, requestHeader);
			const { data }: { data: IPost } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const addPost = (text?: string, category?: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.post(
				POSTS_URL,
				{
					text,
					category,
				},
				requestHeader
			);
			const { data }: { data: IPost } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const addComment = (_id: string, text: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.post(
				POSTS_URL + `/comment/${_id}`,
				{ text: text },
				requestHeader
			);
			const { data }: { data: IPost } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const deleteComment = (postId: string, commentId: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				POSTS_URL + `/${postId}/comment/${commentId}`,
				requestHeader
			);

			const { data }: { data: IPost } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const deletePost = (_id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.delete(
				POSTS_URL + `/${_id}`,
				requestHeader
			);
			const { data }: { data: IPost } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};

export const likePost = (_id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				POSTS_URL + `/like/${_id}`,
				{},
				requestHeader
			);
			const { data }: { data: IPost } = res;
			resolve(data);
		} catch (error: any) {
			console.log(error);
			reject(error);
		}
	});
};
