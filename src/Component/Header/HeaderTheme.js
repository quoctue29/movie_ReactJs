import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";

export default function HeaderTheme() {
  return (
    <div className="bg-gray-100 h-max py-1 px-12 lg:px-20 xl:px-40">
      <div
        className="  flex justify-between items-center m-auto"
        style={{ maxWidth: 1200 }}
      >
        <div>
          <NavLink to="/">
            <img
              className=" w-12"
              src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
            />
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/"
            className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
          >
            Lịch chiếu
          </NavLink>
          <NavLink
            to=""
            className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
          >
            Cụm rạp
          </NavLink>
          <NavLink
            to=""
            className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
          >
            Tin tức
          </NavLink>
          <NavLink
            to=""
            className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
          >
            Ứng dụng
          </NavLink>
        </div>
        <div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
