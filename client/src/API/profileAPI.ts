import axiosInstance from "../Axios/AxiosInstance";
import { IUserState } from "../Interfaces";

export const createProfile = (token: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const createUrl = "/profile/create";
			const requestHeader = {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			};

			const res = await axiosInstance.post(createUrl, {}, requestHeader);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const loadProfile = (token: string) => {
	return new Promise<IUserState>(async (resolve, reject) => {
		try {
			const createUrl = "/profile/me";
			const requestHeader = {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(createUrl, requestHeader);
			const { data }: { data: IUserState } = res;
			resolve(data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
