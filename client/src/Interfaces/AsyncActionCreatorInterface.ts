import { Dispatch } from "redux";

export interface AsyncActionCreatorInterface {
	(dispatch: Dispatch<any>): void;
}
