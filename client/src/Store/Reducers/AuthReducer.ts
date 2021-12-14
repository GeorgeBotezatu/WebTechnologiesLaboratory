import Cookies from "universal-cookie";
import {
	AuthActionInterface,
	AuthReducerStateInterfaces,
} from "../../Interfaces";
import { TOKEN } from "../../Utils/constants";
import { AuthActionTypes } from "../Actions/ActionTypes";

const cookie = new Cookies();
const initialState: AuthReducerStateInterfaces = {
	token: cookie.get(TOKEN),
	isAuthenticated: null,
	loading: true,
	user: null,
};
const reducer = (
	state: AuthReducerStateInterfaces = initialState,
	action: AuthActionInterface
) => {
	const { type, payload } = action;
	switch (action.type) {
		case AuthActionTypes.REGISTER_SUCCESS:
			const date = new Date(10);
			cookie.set(TOKEN, payload.token, { path: "/", expires: date });
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case AuthActionTypes.REGISTER_FAIL:
			cookie.remove(TOKEN);
			return { ...state, token: null, isAuthenticated: false, loading: false };
		default:
			return state;
	}
};

export default reducer;
