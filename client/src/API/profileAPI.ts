import axiosInstance from "../Axios/AxiosInstance";

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
	return new Promise(async (resolve, reject) => {
		try {
			const createUrl = "/profile/me";
			const requestHeader = {
				headers: {
					authorization: `Bearer ${token}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get(createUrl, requestHeader);
			console.log("din api" + res.data);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
