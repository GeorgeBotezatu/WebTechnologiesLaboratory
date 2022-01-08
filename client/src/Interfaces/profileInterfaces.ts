export interface IExperience {
	title?: string;
	company?: string;
	location?: string;
	from?: Date;
	to?: Date | string;
	current?: boolean;
	description?: string;
	_id?: string;
}
export interface IExperienceArr extends Array<IExperience> {}

export interface IEducation {
	school?: string;
	degree?: string;
	fieldofstudy?: string;
	from?: Date;
	to?: Date | string;
	current?: boolean;
	description?: string;
	_id?: string;
}
export interface IEducationArr extends Array<IEducation> {}
export interface IUserState {
	user: {
		_id: string;
		name: string;
		email: string;
		avatar: string;
	};
	about?: {
		website?: string;
		status?: string;
		skills?: string[];
		bio?: string;
	};
	social?: {
		youtube?: string;
		facebook?: string;
		twitter?: string;
		linkedin?: string;
		instagram?: string;
	};
	experience?: IExperienceArr;
	education?: IEducationArr;
	githubusername?: string;
	date: Date | null;
}
export interface IProfileCard {
	github: string | null;
	userCard: {
		_id: string;
		name: string;
		email: string;
		avatar: string;
	} | null;
	profileDate: Date | null;
}
