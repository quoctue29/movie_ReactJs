import moment from "moment";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MovieTabItemTablet({ Phim, Rap }) {
  let isLogin = useSelector((state) => {
    return state.userReducer.userInfor;
  });

  return (
    <div className="w-11/12">
      <div className="grid grid-cols-4 justify-items-stretch">
        <div className=" col-span-1 w-24 mb-8">
          <img src={Phim.hinhAnh} />
        </div>
        <div className=" col-span-3 ">
          <NavLink to={`/detail/${Phim.maPhim}`}>
            <div className=" text-2xl font-medium pr-4 hover:text-black text-gray-600 transition duration-200">
              {Phim.tenPhim.toUpperCase()}
            </div>
          </NavLink>
          <div className="grid grid-cols-2 gap-2 mt-4 justify-items-start ">
            {Phim.lstLichChieuTheoPhim.map((lich, index) => {
              if (index < 4) {
                return (
                  <div key={index}>
                    <NavLink
                      to={
                        isLogin == null
                          ? `/login`
                          : `/buyticket/${lich.maLichChieu}`
                      }
                    >
                      <button
                        key={index}
                        className="  text-start px-3 py-1 rounded-md font-medium hover:bg-slate-200 transition duration-300"
                        style={{ backgroundColor: "#DCD7C9" }}
                      >
                        <span className="">
                          {moment(lich.ngayChieuGioChieu).format("DD-MM-YYYY")}{" "}
                          ~
                        </span>
                        <span className="text-red-500">
                          {moment(lich.ngayChieuGioChieu).format("hh:mm")}
                        </span>
                      </button>
                    </NavLink>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
