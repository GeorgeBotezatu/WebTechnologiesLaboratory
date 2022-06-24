import "./App.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "./API/profileAPI";
import PlatformRoutes from "./Routes/Routes";
import {
	profileLoadFail,
	profileLoadInit,
	profileLoadSuccess,
} from "./Store/features/profileSlice";
import { RootState } from "./Store/Store";
import {
	CAN_NOT_LOAD_COURSES_LIST,
	CAN_NOT_LOAD_POSTS_LIST,
	COULD_NOT_LOAD_PROFILE,
} from "./Utils/constants";
import { getToken } from "./Utils/utilFunctions";
import {
	coursesListLoadFail,
	coursesListLoadInit,
	coursesListLoadSuccess,
} from "./Store/features/coursesSlice";
import { getCoursesList } from "./API/coursesAPI";
import { loginSuccess } from "./Store/features/registerSlice";
import {
	postsLoadFail,
	postsLoadInit,
	postsLoadSuccess,
} from "./Store/features/postsSlice";
import { getPostsList } from "./API/postApi";

function App() {
	const dispatch = useDispatch();

	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		const loadPlatformData = async () => {
			try {
				dispatch(postsLoadInit());
				const postsList = await getPostsList();
				if (!postsList) {
					dispatch(postsLoadFail(CAN_NOT_LOAD_POSTS_LIST));
				} else {
					dispatch(postsLoadSuccess(postsList));
				}

				if (isAuthenticated) {
					dispatch(profileLoadInit());
					dispatch(coursesListLoadInit());
					const user = await loadProfile(getToken());
					if (!user) {
						dispatch(profileLoadFail(COULD_NOT_LOAD_PROFILE));
					} else {
						dispatch(profileLoadSuccess(user));
						dispatch(loginSuccess(user.user.isAdmin));
					}

					const coursesList = await getCoursesList(getToken());
					if (!coursesList) {
						dispatch(coursesListLoadFail(CAN_NOT_LOAD_COURSES_LIST));
					} else {
						dispatch(coursesListLoadSuccess(coursesList));
					}
				}
			} catch (error: any) {
				dispatch(profileLoadFail(error.message));
				dispatch(coursesListLoadFail(error.message));
				dispatch(postsLoadFail(error.message));
			}
		};
		loadPlatformData();
	}, [isAuthenticated, dispatch]);
	return <PlatformRoutes />;
}

export default App;
