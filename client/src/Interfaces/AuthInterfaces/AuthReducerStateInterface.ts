export interface AuthReducerStateInterfaces {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: object | null;
}
