export interface IPost {
	_id?: string;
	user?: string;
	category?: string;
	text?: string;
	name?: string;
	avatar?: string;
	likes?: Array<string>;
	comments?: ICommentsArr;
	date?: string;
}

export interface IPostsArr extends Array<IPost> {}

export interface IComment {
	user?: string;
	text?: string;
	name?: string;
	avatar?: string;
	date?: string;
	_id?: string;
}

export interface ICommentsArr extends Array<IComment> {}
