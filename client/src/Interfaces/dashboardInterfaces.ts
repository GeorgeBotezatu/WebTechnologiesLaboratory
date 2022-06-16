export interface IProblem {
	user?: string;
	description?: string;
	name?: string;
	email?: string;
	problemLink?: string;
	_id?: string;
	date?: string;
}

export interface IProblemArr extends Array<IProblem> {}
