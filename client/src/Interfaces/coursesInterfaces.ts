export interface ICoursesListItem {
	_id?: string;
	courseTitle?: string;
	courseDescription?: string;
}

export interface ICoursesList extends Array<ICoursesListItem> {}
