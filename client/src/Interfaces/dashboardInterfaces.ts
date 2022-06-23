import { IPostsArr } from "./postsInterfaces";
import { IUserArr } from "./profileInterfaces";

export interface IProblem {
	user?: string;
	description?: string;
	name?: string;
	email?: string;
	problemLink?: string;
	_id?: string;
	date?: string;
}
export interface IDashboardStats {
	latestUser?: IUserArr;
	latestPost?: IPostsArr;
	numberOfUsers?: number;
	numberOfPosts?: number;
	numberOfProblems?: number;
	numberOfCourses?: number;
	numberOfChapters?: number;
}

export interface IProblemArr extends Array<IProblem> {}
