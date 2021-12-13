import { combineReducers } from "redux";

const Reducers = combineReducers({});

export default Reducers;

//for typescript useSelector of type
export type RootState = ReturnType<typeof Reducers>;
