import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieServ } from "../../Redux/Action/action";
import { movieService } from "../../Services/movieService";
import { Modal, Progress } from "antd";
import moment from "moment";
import MovieModal from "../Homepage/Modal/MovieModal";
import MovieTab from "../Homepage/MovieTab/MovieTab";
import Ticket from "../../Component/Ticket/Ticket";
import TicketResponsive from "../../Component/Ticket/TicketResponsive";
import { useWindowSize } from "../../Hook/useWindowSize";

export default function DetailPage() {
  let dispatch = useDispatch();
  const [movie, setMovie] = useState({});
  const [visible, setVisible] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [movieTrailer, setMovieTrailer] = useState("");
  const [modalWidth, setModalWidth] = useState(0);
  let { maPhim } = useParams();
  let windowSize = useWindowSize();

  const handleModalWidth = () => {
    if (windowSize.width > 1024) {
      setModalWidth(0.7 * windowSize.width);
    } else {
      setModalWidth(0.85 * windowSize.width);
    }
  };
  useEffect(() => {
    const fetchMovieInfor = async () => {
      let result = await movieService.getMovieInfor(maPhim);

      setMovie(result.data.content);
    };
    fetchMovieInfor();
  }, []);

  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center w-full container m-auto my-8 "
        style={{ maxWidth: 1200 }}
      >
        <div className=" ml-4 sm:ml-0">
          <div
            className=" items-center h-96 w-2/3  lg:h-96 lg:w-4/5 xl:h-128  "
            style={{
              backgroundImage: `url(${movie.hinhAnh})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="h-full w-full opacity-0 hover:opacity-100 transition-all duration-500 relative"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <i
                onClick={() => {
                  setVisible(true);
                  setMovieTrailer(movie.trailer);
                }}
                className="fa fa-play-circle cursor-pointer text-gray-300  hover:text-white  transition duration-300 absolute left-1/2 top-1/2"
                style={{
                  fontSize: "100px",
                  transform: "translate(-50%,-50%)",
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className="w-full pl-4 sm:pl-0 mt-4 sm:mt-0">
          <p className="font-bold text-3xl lg:text-4xl">
            {movie.tenPhim?.toLocaleUpperCase()}
          </p>
          <div className="mt-2">
            {movie.hot ? (
              <div className=" text-center py-1 bg-orange-500  text-white w-10">
                C18
              </div>
            ) : (
              ""
            )}
          </div>
          <p className="mt-4 font-bold">
            Ngày khởi chiếu:
            <span className="text-red-600 font-normal">
              {" "}
              {moment(movie.ngayKhoiChieu).format("DD-MM-YYYY")}
            </span>
          </p>
          <p className="mt-2 font-bold ">
            Tình trạng:
            <span className="text-red-600 font-normal ">
              {movie.dangChieu ? " Đang chiếu" : " Sắp chiếu"}
            </span>
          </p>
          <p className="mt-2 font-bold">
            Mô tả: <span className=" font-normal"> {movie.moTa}</span>
          </p>

          <button
            className="w-28 rounded-md py-2 bg-red-600 text-white text-xl font-medium mt-4"
            onClick={() => {
              handleModalWidth();
              setIsTab(true);
            }}
          >
            Đặt vé
          </button>
        </div>
        <div className=" self-center mx-auto hidden lg:block">
          <Progress
            type="circle"
            percent={movie.danhGia * 10}
            format={(percent) => (
              <span className=" text-red-500">{percent / 10} điểm</span>
            )}
            width={200}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            strokeWidth={10}
          />
        </div>
      </div>
      <div></div>
      <div id="movie_modal">
        {visible && (
          <MovieModal
            visible={visible}
            Movie={movieTrailer}
            setVisible={setVisible}
          />
        )}
      </div>

      <Modal
        title="Lịch chiếu phim"
        visible={isTab}
        onOk={() => {}}
        onCancel={() => {
          setIsTab(false);
        }}
        footer={null}
        width={modalWidth}
        bodyStyle={{ overflow: "hidden" }}
        style={{ maxWidth: 1200 }}
      >
        <TicketResponsive maPhim={maPhim} modalWidth={modalWidth} />
      </Modal>
    </div>
  );
}

// {
//   "maPhim": 1496,
//   "tenPhim": "Southpaw",
//   "biDanh": "southpaw",
//   "trailer": "https://www.youtube.com/embed/Mh2ebPxhoLs",
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/southpaw.jpg",
//   "moTa": "Boxer Billy Hope turns to trainer Tick Willis to help him get his life back on track after losing his wife in a tragic accident and his daughter to child protection services.",
//   "maNhom": "GP03",
//   "hot": true,
//   "dangChieu": false,
//   "sapChieu": true,
//   "ngayKhoiChieu": "2019-07-29T00:00:00",
//   "danhGia": 5
// }
