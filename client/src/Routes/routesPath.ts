export const LANDING_PATH = "/";
export const REGISTER_PATH = "/register";
export const LOGIN_PATH = "/login";

//profile routes
export const PROFILE_PATH = "/profile";
export const MODIFY_ABOUT_PATH = "/profile/edit-about";
export const ADD_EXPERIENCE = "/profile/add-experience";
export const EDIT_EXPERIENCE = "/profile/edit-experience/:id";
export const ADD_EDUCATION = "/profile/add-education";
export const EDIT_EDUCATION = "/profile/edit-education/:id";
export const EDIT_SOCIAL = "/profile/edit-social";

//Console Routes

export const CONSOLE_PATH = "/console";
export const EDIT_CONSOLE_PATH = "/console/:id";

//Dashboard Routes

export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_LEARNING_PATH = "/dashboard/learning";
export const DASHBOARD_LEARNING_PATH_EDIT_COURSE =
	"/dashboard/learning/course/:courseId";
export const DASHBOARD_LEARNING_PATH_CREATE_CHAPTER =
	"/dashboard/learning/course/:courseId/chapter";
export const DASHBOARD_LEARNING_PATH_EDIT_CHAPTER =
	"/dashboard/learning/course/:courseId/chapter/:chapterId";
export const DASHBOARD_LEARNING_PATH_EDIT_QUIZ =
	"/dashboard/learning/course/:courseId/chapter/:chapterId/edit-quiz";
export const DASHBOARD_LEARNING_PATH_CREATE_QUIZ =
	"/dashboard/learning/course/:courseId/chapter/:chapterId/create-quiz";
export const DASHBOARD_STATS_PATH = "/dashboard/stats";
export const DASHBOARD_REPORTS_PATH = "/dashboard/reports";

//Learning Path

export const LEARNING_PATH = "/learning";
export const EDIT_COURSE_PATH = "/learning/course/edit/:id";
export const NEW_COURSE_PATH = "/learning/course/new";
export const COURSE_PAGE = "learning/course/:courseId";
export const COURSE_PAGE_CHAPTER =
	"learning/course/:courseId/chapter/:chapterId";
export const COURSE_PAGE_CHAPTER_QUIZ =
	"learning/course/:courseId/chapter/:chapterId/:quiz";

//Community path
export const COMMUNITY_PATH = "/community";
export const POST_PATH = "/community/post/:postId";
