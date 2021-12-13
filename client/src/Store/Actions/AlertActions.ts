import { v4 as uuid } from "uuid";
import { AlertActionInterface, AlertPayloadInterface } from "../../Interfaces";
import { AlertActionTypes } from "./ActionTypes";

const setAlert = (payload: AlertPayloadInterface[]): AlertActionInterface => ({
	type: AlertActionTypes.SET_ALERT,
	payload,
});

const removeAlert = (id: string): AlertActionInterface => ({
	type: AlertActionTypes.REMOVE_ALERT,
	payload: id,
});

export const triggerAlert = (
	msg: string,
	alertType: string,
	timeout = 5000
) => {
	(dispatch: any) => {
		const id = uuid();
		const payload = [{ msg, alertType, id }];
		dispatch(setAlert(payload));
		setTimeout(() => dispatch(removeAlert(id)), timeout);
	};
};
