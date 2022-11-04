import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MovieTabItemMobile({ Phim, Rap }) {
  let isLogin = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  return (
    <div>
      <div className="grid grid-cols-4 justify-items-strenght items-center  mb-4">
        <div className="col-span-4 grid grid-cols-3 ">
          <div className=" w-full md:w-24 ">
            <img src={Phim.hinhAnh} className="w-20 md:hidden" />
            <img src={Phim.hinhAnh} className="hidden md:block w-22" />
          </div>
          <div className=" col-span-2 font-medium pr-1 hover:text-black text-gray-600 transition duration-200 ml-2">
            <NavLink to={`/detail/${Phim.maPhim}`}>
              {Phim.tenPhim.toUpperCase()}
            </NavLink>
          </div>
        </div>

        <div className=" col-span-4 ">
          <div className="grid grid-cols-2 gap-2 mt-2 justify-items-center md:grid-cols-2 pr-2">
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
                        className="bg-slate-100  text-center px-2 py-1 rounded-md font-medium hover:bg-slate-200 transition duration-300"
                      >
                        <span
                          className="text-green-500 block "
                          style={{ fontSize: "11px" }}
                        >
                          {moment(lich.ngayChieuGioChieu).format("D-M-YYYY")}
                        </span>
                        <span
                          className="text-red-500 block "
                          style={{ fontSize: "11px" }}
                        >
                          {moment(lich.ngayChieuGioChieu).format("LT")}
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
