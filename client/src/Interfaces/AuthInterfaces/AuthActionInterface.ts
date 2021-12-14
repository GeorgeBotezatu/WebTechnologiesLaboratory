import { ActionInterface } from "..";
import { AuthActionTypes } from "../../Store/Actions/ActionTypes";

interface RegisterSuccess extends ActionInterface {
	type: AuthActionTypes.REGISTER_SUCCESS;
	payload: string;
}

interface RegisterFail extends ActionInterface {
	type: AuthActionTypes.REGISTER_FAIL;
	payload: any;
}

type AuthActionInterface = RegisterSuccess | RegisterFail;

export default AuthActionInterface;
