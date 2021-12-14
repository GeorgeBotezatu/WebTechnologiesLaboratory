import { combineReducers } from "redux";
import alert from "./AlertReducer";
import auth from "./AuthReducer";
const Reducers = combineReducers({ alert: alert, auth: auth });

export default Reducers;

//for typescript useSelector of type
export type RootState = ReturnType<typeof Reducers>;
