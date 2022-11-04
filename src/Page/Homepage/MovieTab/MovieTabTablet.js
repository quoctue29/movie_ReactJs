import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieInforServ } from "../../../Redux/Action/action";
import { movieService } from "../../../Services/movieService";
import MovieTabItem from "./MovieTabItem";
import MovieTabItemMobile from "./MovieTabItemMobile";
import MovieTabItemTablet from "./MovieTabItemTablet";
const { TabPane } = Tabs;

const MovieTabMobile = () => {
  //   const [movieListRaw, setMovieListRaw] = useState([]);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     const fetchMovieListByTheater = async () => {
  //       let result = await movieService.getMovieByTheater();

  //       setMovieListRaw(result.data.content);
  //     };
  //     fetchMovieListByTheater();
  //   }, []);
  let movieListRaw = useSelector(
    (state) => state.movieReducer.movieListByTheater
  );

  const renderTheater = () => {
    return movieListRaw.map((hethongRap, index) => {
      return (
        <TabPane
          key={index}
          tab={
            <div className="theater_icon" style={{ width: "14vw" }}>
              <img src={hethongRap.logo} className="h-10 w-10 m-auto" />
            </div>
          }
        >
          <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 400 }}>
            {hethongRap.lstCumRap.map((cumRap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div className=" whitespace-normal w-40 text-center">
                      <p
                        className="text-green-700 uppercase font-medium w-full"
                        style={{ fontSize: "12px" }}
                      >
                        {cumRap.tenCumRap}
                      </p>
                    </div>
                  }
                >
                  <div style={{ overflowY: "scroll", height: "400px" }}>
                    {cumRap.danhSachPhim.map((Phim, index) => {
                      return (
                        <div key={index} className="mt-8 border-b-2 ml-4">
                          <MovieTabItemTablet
                            Phim={Phim}
                            Rap={cumRap.tenCumRap}
                          />
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <Tabs
      className="border-2 px-2"
      onTabClick={() => {
        console.log("hello");
      }}
      defaultActiveKey="1"
      tabPosition="top"
      style={{ width: "98%", height: 500, margin: "auto" }}
    >
      {renderTheater()}
    </Tabs>
  );
};

export default MovieTabMobile;
