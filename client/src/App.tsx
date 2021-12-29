import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "./API/profileAPI";
import "./App.scss";
import PlatformRoutes from "./Routes/Routes";
import {
	profileLoadFail,
	profileLoadInit,
	profileLoadSuccess,
} from "./Store/features/profileSlice";
import { RootState } from "./Store/Store";
import { COULD_NOT_LOAD_PROFILE } from "./Utils/constants";
import { getToken } from "./Utils/utilFunctions";

function App() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		const loadUserProfile = async () => {
			try {
				if (isAuthenticated) {
					dispatch(profileLoadInit());
					const user = await loadProfile(getToken());
					if (!user) {
						dispatch(profileLoadFail(COULD_NOT_LOAD_PROFILE));
					}
					dispatch(profileLoadSuccess(user));
				}
			} catch (error: any) {
				dispatch(profileLoadFail(error.message));
			}
		};
		loadUserProfile();
	}, [isAuthenticated, dispatch]);
	return <PlatformRoutes />;
}

export default App;
