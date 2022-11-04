import axios from "axios";
import { BASE_URL, CYBERSOFT_TOKEN, Services } from "./configURL";

export const movieService = {
  getMovieList: () => {
    return axios.get(`${BASE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03`, {
      headers: { TokenCybersoft: CYBERSOFT_TOKEN },
    });
  },
  getMovieBanner: () => {
    return axios.get(`${BASE_URL}/api/QuanLyPhim/LayDanhSachBanner`, {
      headers: { TokenCybersoft: CYBERSOFT_TOKEN },
    });
  },
  getMovieByTheater: () => {
    return axios.get(
      `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03`,
      {
        headers: { TokenCybersoft: CYBERSOFT_TOKEN },
      }
    );
  },
  getMovieInfor: (id) => {
    return Services.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  getMovieSchedule: (maPhim) => {
    return Services.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
  getMovieBooking: (maLichChieu) => {
    return Services.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  postBoughtTicket: (boughtTicket) => {
    return Services.post(`/api/QuanLyDatVe/DatVe`, boughtTicket);
  },
};
