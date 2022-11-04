import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { movieService } from "../../Services/movieService";
import TicketSchedule from "./TicketSchedule";
import "./ticket.css";
const { TabPane } = Tabs;

const TicketMobile = ({ maPhim, modalWidth }) => {
  const [movieSchedule, setMovieSchedule] = useState({});
  useEffect(() => {
    movieService
      .getMovieSchedule(maPhim)
      .then((res) => {
        setMovieSchedule(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderTab = () => {
    return movieSchedule.heThongRapChieu?.map((cumRap, index) => {
      return (
        <TabPane
          tab={
            <div style={{ width: "80px" }}>
              <img src={cumRap.logo} className="w-10 h-10 m-auto" />
            </div>
          }
          key={index}
        >
          <Tabs defaultActiveKey="1" tabPosition="top">
            {cumRap.cumRapChieu.map((rap, index) => {
              return (
                <TabPane
                  tab={
                    <div className=" w-40 whitespace-normal text-center">
                      <p className="text-green-700 uppercase  font-medium w-full ">
                        {rap.tenCumRap}
                      </p>
                    </div>
                  }
                  key={index}
                >
                  <TicketSchedule Schedule={rap.lichChieuPhim} />
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div className="mx-auto my-8" id="buy_ticket_tab">
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        style={{ width: modalWidth }}
      >
        {renderTab()}
      </Tabs>
    </div>
  );
};

export default TicketMobile;
