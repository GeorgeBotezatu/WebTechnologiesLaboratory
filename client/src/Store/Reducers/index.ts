import { combineReducers } from "redux";
import alert from "./AlertReducer";

const Reducers = combineReducers({ alert: alert });

export default Reducers;

//for typescript useSelector of type
export type RootState = ReturnType<typeof Reducers>;
