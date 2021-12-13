import { AlertPayloadInterface } from "..";

export interface AlertReducerStateInterface {
	loading: boolean;
	payload: AlertPayloadInterface | null;
}
export interface AlertReducerStateArrayInterface
	extends Array<AlertReducerStateInterface> {}
