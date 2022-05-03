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

function App() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		const loadPlatformData = async () => {
			try {
				if (isAuthenticated) {
					dispatch(profileLoadInit());
					dispatch(coursesListLoadInit());
					const user = await loadProfile(getToken());
					if (!user) {
						dispatch(profileLoadFail(COULD_NOT_LOAD_PROFILE));
					}
					dispatch(profileLoadSuccess(user));
					dispatch(loginSuccess(user.user.isAdmin));

					const coursesList = await getCoursesList(getToken());
					if (!coursesList) {
						dispatch(coursesListLoadFail(CAN_NOT_LOAD_COURSES_LIST));
					}
					dispatch(coursesListLoadSuccess(coursesList));
				}
			} catch (error: any) {
				dispatch(profileLoadFail(error.message));
				dispatch(coursesListLoadFail(error.message));
			}
		};
		loadPlatformData();
	}, [isAuthenticated, dispatch]);
	return <PlatformRoutes />;
}

export default App;
