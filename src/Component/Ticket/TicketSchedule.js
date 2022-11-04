import { Tabs } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function TicketSchedule({ Schedule }) {
  const days = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];

  const ngayGioChieuList = [];
  Schedule.map((lichChieu) => {
    let date = new Date(lichChieu.ngayChieuGioChieu).toLocaleDateString();
    let isDup = true;
    for (let index in ngayGioChieuList) {
      if (ngayGioChieuList[index].ngay == date) {
        ngayGioChieuList[index].gioChieu.push({
          time: lichChieu.ngayChieuGioChieu,
          maLichChieu: lichChieu.maLichChieu,
        });
        isDup = false;
      }
    }
    {
      isDup &&
        ngayGioChieuList.push({
          ngay: date,

          ngayChieu: lichChieu.ngayChieuGioChieu,
          gioChieu: [
            {
              time: lichChieu.ngayChieuGioChieu,
              maLichChieu: lichChieu.maLichChieu,
            },
          ],
        });
    }
  });
  let isLogin = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  return (
    <div>
      <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
        {ngayGioChieuList.map((lich, index) => {
          let d = new Date(lich.ngayChieu);
          let weekday = days[d.getDay()];
          if (index < 8) {
            return (
              <TabPane
                tab={
                  <div className="px-3  text-black">
                    <div className="text-center lg:text-lg font-medium">
                      {weekday}
                    </div>
                    <div className="text-center">
                      {moment(lich.ngayChieu)?.format("DD-MM")}
                    </div>
                  </div>
                }
                key={index}
              >
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 ">
                  {lich.gioChieu.map((gio, index) => {
                    return (
                      <NavLink
                        to={
                          isLogin == null
                            ? `/login`
                            : `/buyticket/${gio.maLichChieu}`
                        }
                        key={index}
                        className="text-black hover:text-black"
                      >
                        <button
                          className="bg-slate-100  text-center px-3 py-1 rounded-md font-medium hover:bg-slate-200 transition duration-300 text-red-500 mr-4"
                          style={{ width: 100 }}
                        >
                          {moment(gio.time).format("LT")}
                        </button>
                      </NavLink>
                    );
                  })}
                </div>
              </TabPane>
            );
          }
        })}
      </Tabs>
    </div>
  );
}
