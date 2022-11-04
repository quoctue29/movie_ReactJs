import { message } from "antd";
import { useHistory } from "react-router-dom";
import { movieService } from "../../Services/movieService";
import { getUserServ } from "../../Services/userServices";
import {
  GET_MOVIE_INFOR,
  GET_MOVIE_INFOR_BY_THEATER,
  GET_USER_INFOR,
  HIDE_SPINNER,
  SHOW_SPINNER,
} from "../Constant/constant";

export const getUserInforAction = (payload) => {
  return {
    type: GET_USER_INFOR,
    payload: payload,
  };
};

export const getMovieInforServ = () => {
  return (dispatch) => {
    movieService
      .getMovieByTheater()
      .then((res) => {
        dispatch({
          type: GET_MOVIE_INFOR_BY_THEATER,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const postUserRegisterAction = (payload, onSuccess = () => {}) => {
  return () => {
    getUserServ
      .postUserRegister(payload)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => {
        message.error(`${err.response.data.content}`);
      });
  };
};

export const getMovieInfor = (payload) => {
  return { type: GET_MOVIE_INFOR, payload: payload };
};

export const showSpinner = () => {
  return { type: SHOW_SPINNER };
};
export const hideSpinner = () => {
  return { type: HIDE_SPINNER };
};
