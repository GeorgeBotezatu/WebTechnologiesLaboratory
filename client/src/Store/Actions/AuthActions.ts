import {
	AsyncActionCreatorInterface,
	AuthActionInterface,
} from "../../Interfaces";
import { AlertActionTypes, AuthActionTypes } from "./ActionTypes";
import axiosInstance from "../../Axios/AxiosInstance";
import { triggerAlert } from "./AlertActions";

const registerSuccess = (payload: string): AuthActionInterface => ({
	type: AuthActionTypes.REGISTER_SUCCESS,
	payload,
});

const registerFail = (payload: any): AuthActionInterface => ({
	type: AuthActionTypes.REGISTER_FAIL,
	payload,
});

export const register =
	(
		name: string,
		email: string,
		password: string
	): AsyncActionCreatorInterface =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			name,
			email,
			password,
		});
		try {
			const res = await axiosInstance.post("/user", body, config);
			dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data });
		} catch (error: any) {
			const errors = error.response.data.errors;
			if (errors) {
				errors.forEach((error: any) =>
					dispatch(triggerAlert(error.message, "danger"))
				);
			}
			dispatch({ type: AuthActionTypes.REGISTER_FAIL });
		}
	};
