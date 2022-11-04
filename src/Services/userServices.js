import axios from "axios";
import { Services } from "./configURL";

export const getUserServ = {
  postUserLogin: (dataLogin) => {
    // return axios({
    //   url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
    //   method: "POST",
    //   data: dataLogin,
    //   headers: { TokenCybersoft: CYBERSOFT_TOKEN },
    // });
    return Services.post("/api/QuanLyNguoiDung/DangNhap", dataLogin);
  },
  postUserRegister: (dataRegister) => {
    return Services.post("/api/QuanLyNguoiDung/DangKy", dataRegister);
  },
  getUserInfor: () => {
    return Services.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  postUserInfor: (userInfor) => {
    return Services.put(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      userInfor
    );
  },
};
