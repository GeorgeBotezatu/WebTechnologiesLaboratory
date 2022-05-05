export interface ICoursesListItem {
	_id?: string;
	courseTitle?: string;
	courseDescription?: string;
}

export interface ICoursesList extends Array<ICoursesListItem> {}

export interface ICourse {
	_id?: string;
	courseTitle?: string;
	courseDescription?: string;
	chapters?: ICourseChapterArr;
}

export interface ICourseChapter {
	chapterTitle?: string;
	content?: string;
	order?: string;
	_id?: string;
	quiz?: ICourseChapterQuizArr;
}

export interface ICourseChapterArr extends Array<ICourseChapter> {}
export interface ICourseChapterQuiz {
	question?: string;
	answer1: IQuizAnswer;
	answer2: IQuizAnswer;
	answer3: IQuizAnswer;
	answer4: IQuizAnswer;
}
export interface ICourseChapterQuizArr extends Array<ICourseChapterQuiz> {}

export interface IQuizAnswer {
	text?: string;
	correct?: boolean;
}
