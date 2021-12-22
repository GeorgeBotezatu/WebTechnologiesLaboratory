//general
import { AsyncActionCreatorInterface } from "./AsyncActionCreatorInterface";
import { ActionInterface } from "./ActionInterfaces";

//ALERT INTERFACE
import { AlertPayloadInterface } from "./AlertInterfaces/AlertPayloadInterface";
import { AlertReducerStateArrayInterface } from "./AlertInterfaces/AlertReducerStateInterface";
import AlertActionInterface from "./AlertInterfaces/AlertActionInterface";
import { AlertReducerStateInterface } from "./AlertInterfaces/AlertReducerStateInterface";
//AUTH
import AuthActionInterface from "./AuthInterfaces/AuthActionInterface";
import { AuthReducerStateInterfaces } from "./AuthInterfaces/AuthReducerStateInterface";
export type {
	AsyncActionCreatorInterface,
	ActionInterface,
	//ALert
	AlertPayloadInterface,
	AlertActionInterface,
	AlertReducerStateInterface,
	AlertReducerStateArrayInterface,
	//AUTH
	AuthActionInterface,
	AuthReducerStateInterfaces,
};