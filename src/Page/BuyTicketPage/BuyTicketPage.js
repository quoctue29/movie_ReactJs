import { message } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../Services/movieService";

export default function BuyTicketPage() {
  let bgColor = "";
  let { maLichChieu } = useParams();
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [movie, setMovie] = useState({});
  const [seat, setSeat] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [chosenSeatInfor, setChosenSeatInfor] = useState([]);
  const [chosenSeatList, setChosenSeatList] = useState([]);
  class ChosenSeat {
    constructor(seatName, price) {
      this.seatName = seatName;
      this.price = price;
    }
  }
  let tongTien = chosenSeatList.reduce((Acc, curr) => {
    return (Acc += curr.price);
  }, 0);
  const fetchMovieBooking = async () => {
    let result = await movieService.getMovieBooking(maLichChieu);
    let chunkedData = _.chunk(result.data.content.danhSachGhe, 16);
    setSeat(chunkedData);
    setMovie(result.data.content);

    setIsVisible(true);
  };
  useEffect(() => {
    fetchMovieBooking();
  }, []);
  const handleChooseTicket = (indexSeat, indexRow, ghe, e) => {
    let idSeat = indexSeat + 1;

    let tenSoGhe = alphabet[indexRow].toLocaleUpperCase() + idSeat;
    let chosenSeat = new ChosenSeat(tenSoGhe, ghe.giaVe);
    setChosenSeatInfor((prev) => {
      let isChosen = false;
      for (let index in prev) {
        let checkDup = JSON.stringify(prev[index]) === JSON.stringify(ghe);

        if (checkDup) {
          isChosen = true;
          break;
        } else {
          isChosen = false;
        }
      }

      if (isChosen) {
        return chosenSeatInfor.filter((item) => {
          return item.maGhe !== ghe.maGhe;
        });
      } else {
        let clonePrev = [...prev];

        clonePrev.push(ghe);
        return clonePrev;
      }
    });
    setChosenSeatList((prev) => {
      let isChosen = false;
      for (let index in prev) {
        let checkDup =
          JSON.stringify(prev[index]) === JSON.stringify(chosenSeat);

        if (checkDup) {
          isChosen = true;
          break;
        } else {
          isChosen = false;
        }
      }

      if (isChosen) {
        e.target.classList.remove("!bg-green-500");
        return chosenSeatList.filter((item) => {
          return item.seatName !== chosenSeat.seatName;
        });
      } else {
        e.target.classList.add("!bg-green-500");

        let clonePrev = [...prev];
        clonePrev.push(chosenSeat);
        return clonePrev;
      }
    });
  };
  const handlePurchase = () => {
    if (chosenSeatInfor.length !== 0) {
      movieService
        .postBoughtTicket({
          maLichChieu: maLichChieu,
          danhSachVe: chosenSeatInfor,
        })
        .then((res) => {
          message.success(res.data.content);
          fetchMovieBooking();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setChosenSeatList([]);
    setChosenSeatInfor([]);
  };

  return (
    <div className="py-12 m-auto" style={{ maxWidth: 1200 }}>
      {isVisible && (
        <div
          className="grid grid-cols-1 m-auto w-full lg:grid-cols-2 items-center justify-center justify-items-center"
          // style={{ width: 1200 }}
        >
          <div className="w-full sm:w-5/6 md:w-4/5 lg:w-11/12 rounded-xl overflow-hidden flex flex-col justify-center items-center bg-yellow-200 pb-3">
            <div className=" h-6 w-full bg-slate-600 text-white text-center">
              Màn hình
            </div>
            <div className="w-full my-4 flex justify-center">
              <table className="table-auto m-auto block max-w-max">
                <tbody>
                  {seat.map((row, indexRow) => {
                    return (
                      <tr key={indexRow}>
                        <td className="w-8">
                          <div className="text-sm md:text-base">
                            {alphabet[indexRow].toLocaleUpperCase()}
                          </div>
                        </td>
                        <td>
                          <div className="flex ">
                            {row.map((ghe, indexSeat) => {
                              if (ghe.loaiGhe == "Thuong") {
                                bgColor = "bg-slate-300 hover:bg-slate-200";
                              } else {
                                bgColor = "bg-orange-400 hover:bg-orange-200";
                              }
                              return ghe.daDat ? (
                                <button
                                  className={`w-3 h-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5 bg-slate-600 mx-1 my-1 md:rounded-md rounded-sm font-medium`}
                                  key={indexSeat}
                                  value={ghe.tenGhe}
                                  style={{}}
                                >
                                  <span className="text-red-600"></span>
                                </button>
                              ) : (
                                <button
                                  className={`w-3 h-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5 ${bgColor} mx-1 my-1 md:rounded-md rounded-sm transition duration-200`}
                                  key={indexSeat}
                                  id={ghe.tenGhe}
                                  onClick={(e) => {
                                    handleChooseTicket(
                                      indexSeat,
                                      indexRow,
                                      ghe,
                                      e
                                    );
                                  }}
                                  style={{}}
                                ></button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 items-start  justify-items-start">
              <div className="flex items-center  mr-3 ">
                <button
                  className={`w-4 h-4  bg-slate-300 mx-1 my-1 rounded-md`}
                ></button>
                <span className="text-sm">: Ghế thường</span>
              </div>
              <div className="flex items-center  mr-3">
                <button
                  className={`w-4 h-4  bg-green-500 mx-1 my-1 rounded-md`}
                ></button>
                <span className="text-sm">: Ghế đang chọn</span>
              </div>
              <div className="flex items-center  mr-3">
                <button
                  className={`w-4 h-4  bg-slate-600 mx-1 my-1 rounded-md font-medium`}
                >
                  <span className="text-red-600"></span>
                </button>
                <span className="text-sm">: Ghế đã đặt</span>
              </div>
              <div className="flex items-center  mr-3">
                <button
                  className={`w-4 h-4  bg-orange-400 mx-1 my-1 rounded-md`}
                ></button>
                <span className="text-sm">: Ghế VIP</span>
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-4/5 xl:w-3/5 border-2 border-black  flex flex-col rounded-xl my-8 mx-auto">
            <table className="table-auto w-11/12 mx-auto block pb-8">
              <thead className="w-full mx-auto">
                <tr className="">
                  <th colSpan={2} className="py-4 lg:py-8 text-lg">
                    Thông tin đặt vé
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="border-collapse border-b h-10 border-black w-full">
                  <td className="font-medium text-md w-3/5 lg:w-1/2">Phim:</td>
                  <td className=" font-medium text-right">
                    {movie.thongTinPhim.tenPhim.toLocaleUpperCase()}
                  </td>
                </tr>
                <tr className="border-collapse border-b h-10 border-black ">
                  <td className="font-medium text-md ">
                    Ngày chiếu giờ chiếu:
                  </td>
                  <td className="text-right ">{movie.thongTinPhim.gioChieu}</td>
                </tr>
                <tr className="border-collapse border-b h-10 border-black ">
                  <td className="font-medium text-md ">Cụm rạp</td>
                  <td className="text-right ">
                    {movie.thongTinPhim.tenCumRap}
                  </td>
                </tr>
                <tr className="border-collapse border-b h-10 border-black ">
                  <td className="font-medium text-md ">Rạp</td>
                  <td className="text-right ">{movie.thongTinPhim.tenRap}</td>
                </tr>
                <tr className="border-collapse border-b border-black ">
                  <td className="font-medium text-md  h-44 align-top">
                    Ghế đã chọn
                  </td>
                  <td className="align-top text-right  grid grid-cols-1 md:grid-cols-2">
                    {chosenSeatList.map((thongTinGhe, index) => {
                      return (
                        <div key={index}>
                          <span className="font-medium">
                            {thongTinGhe.seatName}
                          </span>
                          -{" "}
                          <span className="font-medium text-red-500">
                            {new Intl.NumberFormat("vi-VI").format(
                              thongTinGhe.price
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </td>
                </tr>
                <tr className="border-collapse border-b h-10 border-black ">
                  <td className="font-medium text-md ">Tổng tiền</td>
                  <td className="text-right  text-lg text-red-500 font-medium">
                    {new Intl.NumberFormat("vi-VI").format(tongTien)} VND
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="w-full text-center self-end mb-4 lg:mb-8 rounded-lg">
              <button
                className="w-11/12 bg-red-600 text-white block m-auto py-3 text-lg font-medium rounded-lg"
                onClick={() => {
                  handlePurchase();
                }}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// {
//   "maGhe": 58920,
//   "tenGhe": "160",
//   "maRap": 522,
//   "loaiGhe": "Thuong",
//   "stt": "160",
//   "giaVe": 120000,
//   "daDat": false,
//   "taiKhoanNguoiDat": null
// }
