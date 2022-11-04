import { HIDE_SPINNER, SHOW_SPINNER } from "../Constant/constant";

let initialState = {
  isShowSpinner: false,
};

export const spinnerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_SPINNER: {
      state.isShowSpinner = true;
      return { ...state };
    }
    case HIDE_SPINNER: {
      state.isShowSpinner = false;
      return { ...state };
    }
    default:
      return state;
  }
};
