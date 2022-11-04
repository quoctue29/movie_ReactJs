import type { MenuProps } from "antd";
import { Dropdown, Menu, message, Space, Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { localService } from "../../Services/localService";

export default function UserNav() {
  let userInfor = useSelector((state) => {
    return state.userReducer.userInfor;
  });

  const menu = (
    <Menu
      items={[
        {
          label: "Thông tin cá nhân",
          key: "1",
          onClick: () => {
            window.location.href = `/profile/${userInfor.taiKhoan}`;
          },
        },
        {
          label: "Đăng xuất",
          key: "2",
          onClick: () => {
            localService.removeUserInfor();
            window.location.href = "/";
          },
        },
        {
          label: "Trang admin",
          key: "3",
          onClick: () => {
            localService.removeUserInfor();
            userInfor.maLoaiNguoiDung == "QuanTri"
              ? (window.location.href = "https://cinemaadmin.web.app/")
              : (window.location.href = "/");
          },
        },
      ]}
    />
  );
  return (
    <div>
      {userInfor ? (
        <div className="flex">
          <div className=" px-2 font-medium  text-red-500 hover:text-orange-600 transition duration-200">
            <span className="text-black">Xin chào,</span>{" "}
            <Dropdown overlay={menu} placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}>
                <Space>{userInfor?.hoTen}</Space>
              </a>
            </Dropdown>
          </div>
        </div>
      ) : (
        <div>
          <NavLink to="/login">
            <button className=" px-2 font-medium  text-gray-500 hover:text-orange-600 transition duration-200">
              Đăng nhập
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="px-2 font-medium  text-white py-1 rounded-md hover:bg-red-600 transition duration-200 bg-red-700">
              Đăng ký
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
