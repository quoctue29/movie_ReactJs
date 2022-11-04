import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { movieService } from "../../Services/movieService";
import TicketSchedule from "./TicketSchedule";
import "./ticket.css";
const { TabPane } = Tabs;

const Ticket = ({ maPhim }) => {
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
          tab={<img src={cumRap.logo} className="w-10 h-10" />}
          key={index}
        >
          <Tabs defaultActiveKey="1" tabPosition="left">
            {cumRap.cumRapChieu.map((rap, index) => {
              return (
                <TabPane
                  tab={
                    <div className=" w-64 whitespace-normal text-left">
                      <p className="text-green-700 uppercase  font-medium ">
                        {rap.tenCumRap}
                      </p>
                      <p className=" text-black ">{rap.diaChi}</p>
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
    <div className="mx-auto my-8" style={{ width: 1200 }} id="buy_ticket_tab">
      <Tabs defaultActiveKey="1" tabPosition="left">
        {renderTab()}
      </Tabs>
    </div>
  );
};

export default Ticket;
