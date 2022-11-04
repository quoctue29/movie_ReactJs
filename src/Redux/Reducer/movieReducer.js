import { GET_MOVIE_INFOR_BY_THEATER } from "../Constant/constant";

const initialState = {
  movieInfor: {
    cumRap: "",
    rap: "",
    ngayChieuGioChieu: "",
  },
  movieListByTheater: [],
};
export const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE_INFOR_BY_THEATER: {
      state.movieListByTheater = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
