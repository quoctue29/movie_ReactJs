import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";

export default function HeaderMobile() {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <NavLink
              to="/"
              className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
            >
              Lịch chiếu
            </NavLink>
          ),
          key: "0",
        },
        {
          label: (
            <NavLink
              to=""
              className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
            >
              Cụm rạp
            </NavLink>
          ),
          key: "1",
        },

        {
          label: (
            <NavLink
              to=""
              className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
            >
              Tin tức
            </NavLink>
          ),
          key: "3",
        },
        {
          label: (
            <NavLink
              to=""
              className=" mr-5 font-medium hover:text-orange-500 transition duration-300 text-base"
            >
              Ứng dụng
            </NavLink>
          ),
          key: "4",
        },
      ]}
    />
  );
  return (
    <div>
      <div className="w-full bg-gray-100">
        <div className="m-auto max-w-max py-1">
          <NavLink to="/">
            <img
              className="h-8 m-0"
              src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
            />
          </NavLink>
        </div>
        <div className="  h-max py-1 px-2 flex justify-between items-center border-t-2">
          <div className="">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className="font-medium hover:text-orange-500 text-black transition duration-300">
                    MENU
                  </span>
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className="">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
