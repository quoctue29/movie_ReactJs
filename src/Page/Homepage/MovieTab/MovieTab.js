import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieInforServ } from "../../../Redux/Action/action";
import { movieService } from "../../../Services/movieService";
import MovieTabItem from "./MovieTabItem";
const { TabPane } = Tabs;

const MovieTab = () => {
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
            <div className="theater_icon">
              <img src={hethongRap.logo} className="h-10 w-10 " />
            </div>
          }
        >
          <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 500 }}>
            {hethongRap.lstCumRap.map((cumRap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div className=" w-80 whitespace-normal">
                      <p className="text-green-700 uppercase font-medium ">
                        {cumRap.tenCumRap}
                      </p>
                      <p className=" text-black ">{cumRap.diaChi}</p>
                    </div>
                  }
                >
                  <div style={{ overflowY: "scroll", height: 460 }}>
                    {cumRap.danhSachPhim.map((Phim, index) => {
                      return (
                        <div key={index}>
                          <MovieTabItem Phim={Phim} Rap={cumRap.tenCumRap} />
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
      className="border-2 "
      onTabClick={() => {
        console.log("hello");
      }}
      defaultActiveKey="1"
      tabPosition="left"
      style={{
        width: 1024,
        height: 500,
        margin: "auto",
      }}
    >
      {renderTheater()}
    </Tabs>
  );
};

export default MovieTab;
