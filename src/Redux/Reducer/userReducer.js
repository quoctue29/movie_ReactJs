import { compose } from "redux";
import { localService } from "../../Services/localService";
import { GET_MOVIE_INFOR, GET_USER_INFOR } from "../Constant/constant";

const initialState = {
  userInfor: localService.getUserInfor(),
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_INFOR: {
      state.userInfor = payload;
      return { ...state };
    }

    default:
      return state;
  }
};
