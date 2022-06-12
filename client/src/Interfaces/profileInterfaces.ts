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

export interface ICodeSaves {
	name?: string;
	js?: string;
	css?: string;
	html?: string;
	_id?: string;
}
export interface ICodeSavesArr extends Array<ICodeSaves> {}
export interface IUserState {
	user: {
		_id: string;
		name: string;
		email: string;
		avatar: string;
		isAdmin: boolean;
	};
	codeSaves?: ICodeSavesArr;
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
	enroledCourses?: IEnrolledCoursesArr;
	experience?: IExperienceArr;
	education?: IEducationArr;
	githubusername?: string;
	date: Date | null;
}

export interface IEnrolledCourses {
	courseId?: string;
	quizScores?: IQuizScoreArr;
	numberOfChapters?: number;
	completedChapters?: ICompletedChapterArr;
	finished?: boolean;
	enroledDate?: Date;
}

export interface IEnrolledCoursesArr extends Array<IEnrolledCourses> {}
export interface IQuizScore {
	chapterId?: string;
	quizScore?: string;
}
export interface IQuizScoreArr extends Array<IQuizScore> {}
export interface ICompletedChapter {
	_id?: string;
}
export interface ICompletedChapterArr extends Array<ICompletedChapter> {}
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
