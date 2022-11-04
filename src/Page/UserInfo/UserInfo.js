import { Modal, Segmented } from "antd";
import { LockOutlined } from "@ant-design/icons";

import { Form, Input } from "antd";
import { useSelector, useStore } from "react-redux";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserServ } from "../../Services/userServices";
import moment from "moment";
import UpdateUserInfor from "./UpdateUserInfor";

export default function UserInfo() {
  let { infor } = useParams();
  const [userInfor, setUserInfor] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [userInforChange, setUserInforChange] = useState(0);

  const [inforType, setInforType] = useState("Thông tin cá nhân");
  useEffect(() => {
    getUserServ
      .getUserInfor()
      .then((res) => {
        setUserInfor(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInforChange]);

  return (
    <div className="w-80 md:w-184 sm:w-128 lg:w-240 mx-auto my-8">
      <Segmented
        block
        options={["Thông tin cá nhân", "Thông tin đặt vé"]}
        size="large"
        onChange={(e) => {
          setInforType(e);
        }}
      />
      {inforType == "Thông tin cá nhân" && (
        <div className=" " style={{ backgroundColor: "#EFEFEF" }}>
          <table className="table-auto w-5/6 font-medium mx-auto text-sm xs:text-base">
            <tbody className="w-full">
              <tr className="w-full h-12 border-collapse border-b border-gray-300">
                <td className="w-1/2 ">Họ tên:</td>
                <td className="text-right ">{userInfor.hoTen}</td>
              </tr>
              <tr className="w-full h-12 border-collapse border-b border-gray-300">
                <td className="w-1/2 ">Email:</td>
                <td className="text-right ">{userInfor.email}</td>
              </tr>
              <tr className="w-full h-12 border-collapse border-b border-gray-300">
                <td className="w-1/2 ">Số điện thoại:</td>
                <td className="text-right ">{userInfor.soDT}</td>
              </tr>
              <tr className="w-full h-12 border-collapse border-b border-gray-300">
                <td className="w-1/2 ">Tài khoản:</td>
                <td className="text-right ">{userInfor.taiKhoan}</td>
              </tr>
              <tr className="w-full h-12 border-collapse border-b border-gray-300">
                <td className="w-1/2 ">Mật khẩu:</td>
                <td className="text-right ">{userInfor.matKhau}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            <button
              className="bg-blue-600 px-3 py-2 text-white rounded-md my-4"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Thay đổi thông tin
            </button>
            <Modal
              title={null}
              centered
              visible={modalVisible}
              onOk={() => {
                setModalVisible(false);
              }}
              onCancel={() => {
                setModalVisible(false);
              }}
              footer={null}
            >
              <UpdateUserInfor
                userInfor={userInfor}
                setUserInforChange={setUserInforChange}
                setModalVisible={setModalVisible}
              />
            </Modal>
          </div>
        </div>
      )}
      {inforType == "Thông tin đặt vé" && (
        <div className=" " style={{ backgroundColor: "#EFEFEF" }}>
          <div className="text-xl pl-4 font-medium py-4">
            Thông tin vé đã đặt
          </div>
          <div className="h-184 " style={{ overflowY: "scroll" }}>
            {userInfor.thongTinDatVe?.map((infor, index) => {
              console.log(infor);
              return (
                <div
                  className="w-full flex mt-4 mb-8 border-b border-slate-500 pb-8"
                  key={index}
                >
                  <div className="w-1/2 lg:w-1/3 ">
                    <img src={infor.hinhAnh} className="w-3/4 mx-auto my-2" />
                    <div className="w-3/4 mx-auto">
                      <p className="text-sm sm:text-lg text-red-500 font-medium">
                        {infor.tenPhim.toLocaleUpperCase()}
                      </p>

                      <p>
                        <span className="font-medium">Thời lượng:</span>{" "}
                        {infor.thoiLuongPhim}p
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 lg:w-2/3">
                    <p className="italic text-sm mb-2">
                      <span className="font-medium ">Đã đặt ngày:</span>{" "}
                      {moment(infor.ngayDat).format("DD-MM-YYYY")} -{" "}
                      {moment(infor.ngayDat).format("LT")}
                    </p>
                    <p className="text-sm sm:text-lg text-red-500 font-medium">
                      {infor.danhSachGhe[0].tenHeThongRap.toLocaleUpperCase()}
                    </p>
                    <p className="text-sm sm:text-lg font-medium">
                      {infor.danhSachGhe[0].maCumRap}
                    </p>
                    <p className="font-medium text-sm sm:text-lg">Tên ghế:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 my-3">
                      {infor.danhSachGhe.map((soGhe, index) => {
                        return (
                          <button
                            className="w-14 py-2 bg-green-200 rounded-md"
                            key={index}
                          >
                            {soGhe.tenGhe}
                          </button>
                        );
                      })}
                    </div>
                    ;
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
