import { Card, Modal } from "antd";
import { transform } from "lodash";
import moment from "moment";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import TicketResponsive from "../../../Component/Ticket/TicketResponsive";
import { useWindowSize } from "../../../Hook/useWindowSize";
import { movieService } from "../../../Services/movieService";
import MovieModal from "../Modal/MovieModal";
const { Meta } = Card;

const MovieItem = ({ Movie, Index }) => {
  const [visible, setVisible] = useState(false);
  const [movie, setMovie] = useState("");
  const [modalWidth, setModalWidth] = useState(0);
  const [maPhim, setMaPhim] = useState(0);
  const [isTab, setIsTab] = useState(false);

  let windowSize = useWindowSize();

  const handleModalWidth = () => {
    if (windowSize.width > 1024) {
      setModalWidth(0.7 * windowSize.width);
    } else {
      setModalWidth(0.85 * windowSize.width);
    }
  };

  return (
    <div key={Index}>
      <Card hoverable className="h-full border-none max-h-max" style={{}}>
        <div className="w-full h-48 md:h-80 lg:h-128 " style={{}}>
          <div id="movie_img" className="w-full h-full">
            <div
              className="flex justify-center items-center h-full w-full"
              style={{
                backgroundImage: `url(${Movie.hinhAnh})`,
                backgroundPosition: "center 0px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="h-full w-full opacity-0 hover:opacity-100 transition-all duration-500 relative"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <i
                  className="fa fa-play-circle cursor-pointer text-gray-300  hover:text-white  transition duration-300 absolute left-1/2 top-1/2"
                  style={{
                    fontSize: "70px",
                    transform: "translate(-50%,-50%)",
                  }}
                  onClick={() => {
                    setVisible(true);
                    setMovie(Movie.trailer);
                  }}
                ></i>

                <div className="absolute bottom-0 left-0 w-full my-2">
                  <p
                    className=" hidden lg:block text-2xl xl:text-4xl xl:mb-6 w-full whitespace-normal align-middle mt-6 text-white font-bold text-center mb-3 "
                    style={{ wordWrap: "break-word" }}
                  >
                    {Movie.tenPhim.toUpperCase()}
                  </p>
                  <div className="flex justify-around items-center">
                    <button className=" text-center px-2 py-1 bg-red-700 text-white w-24  hover:bg-red-500 mb-2 md:mb-3 lg:w-32 lg:mb-8 xl:w-40 xl:py-2">
                      <NavLink to={`/detail/${Movie.maPhim}`}>
                        <div className="hover:text-white text-white text-sm lg:text-lg">
                          Xem chi tiết
                        </div>
                      </NavLink>
                    </button>
                    <button className=" hidden md:inline-block text-center px-2 py-1  bg-red-700 text-white w-24  hover:bg-red-500 md:mb-3 lg:w-32 lg:mb-8 xl:w-40 xl:py-2">
                      <div
                        className="hover:text-white text-white text-sm lg:text-lg"
                        onClick={(e) => {
                          handleModalWidth();
                          setMaPhim(Movie.maPhim);
                          setIsTab(true);
                          e.stopPropagation();
                        }}
                      >
                        Mua vé
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div id="movie_modal">
        {visible && (
          <MovieModal visible={visible} setVisible={setVisible} Movie={movie} />
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
      >
        <TicketResponsive maPhim={maPhim} modalWidth={modalWidth} />
      </Modal>
    </div>
  );
};

export default MovieItem;

// {
//   "maPhim": 9128,
//   "tenPhim": "iron man 1",
//   "biDanh": "iron-man-1",
//   "trailer": "https://youtu.be/8ugaeA-nMTc",
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/iron-man-1_gp03.jpg",
//   "moTa": "Người sắt - Iron Man là bộ phim điện ảnh thuộc thể loại viễn tưởng - siêu anh hùng của Hollywood, được phát hành vào năm 2008 dựa trên nhân vật truyện tranh của Marvel Comics. Bộ phim do Marvel Studio sản xuất, Paramount Pictures chịu trách nhiệm xuất bản. Đây cũng là bộ phim đầu tiên đánh dấu cho sự trỗi dậy của đế chế Marvel. ",
//   "maNhom": "GP03",
//   "ngayKhoiChieu": "2022-06-03T00:00:00",
//   "danhGia": 9,
//   "hot": true,
//   "dangChieu": true,
//   "sapChieu": true
// }
