import { ActionInterface, AlertPayloadInterface } from "..";
import { AlertActionTypes } from "../../Store/Actions/ActionTypes";

interface SetAlertActionInterface extends ActionInterface {
	type: AlertActionTypes.SET_ALERT;
	payload: AlertPayloadInterface[];
}

interface RemoveAlertActionInterface extends ActionInterface {
	type: AlertActionTypes.REMOVE_ALERT;
	payload: string;
}

type AlertActionInterface =
	| SetAlertActionInterface
	| RemoveAlertActionInterface;

export default AlertActionInterface;
