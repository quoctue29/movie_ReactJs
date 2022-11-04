import { combineReducers } from "redux";
import { userReducer } from "../Reducer/userReducer";
import { movieReducer } from "./movieReducer";
import { spinnerReducer } from "./spinnerReducer";

export const rootReducer = combineReducers({
  userReducer,
  movieReducer,
  spinnerReducer,
});
