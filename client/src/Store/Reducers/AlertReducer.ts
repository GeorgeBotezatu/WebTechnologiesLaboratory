import {
	AlertActionInterface,
	AlertReducerStateArrayInterface,
} from "../../Interfaces";
import { AlertActionTypes } from "../Actions/ActionTypes";

const initialState: AlertReducerStateArrayInterface = [
	{ loading: false, payload: null },
];
const reducer = (
	state: AlertReducerStateArrayInterface = initialState,
	action: AlertActionInterface
) => {
	const { type, payload } = action;
	switch (action.type) {
		case AlertActionTypes.SET_ALERT:
			return [...state, payload];
		case AlertActionTypes.REMOVE_ALERT:
			return state.filter((alert) => alert.payload?.id !== payload);
		default:
			return state;
	}
};

export default reducer;
