import Layout from "../Component/HOC_component/Layout";
import BuyTicketPage from "../Page/BuyTicketPage/BuyTicketPage";
import DetailPage from "../Page/DetailPage/DetailPage";
import Homepage from "../Page/Homepage/Homepage";
import LoginPage from "../Page/LoginPage/LoginPage";
import RegisterPage from "../Page/RegisterPage/RegisterPage";
import UserInfo from "../Page/UserInfo/UserInfo";

export const userRouter = [
  {
    path: "/",
    component: <Layout Component={Homepage} />,
    exact: true,
    isUseLayout: true,
  },
  {
    path: "/login",
    component: <Layout Component={LoginPage} />,
    isUseLayout: true,
  },
  {
    path: "/register",
    component: <Layout Component={RegisterPage} />,

    isUseLayout: true,
  },
  {
    path: "/detail/:maPhim",
    component: <Layout Component={DetailPage} />,
    isUseLayout: true,
  },
  {
    path: "/detail/:maPhim",
    component: <Layout Component={DetailPage} />,
    isUseLayout: true,
  },
  {
    path: "/buyticket/:maLichChieu",
    component: <Layout Component={BuyTicketPage} />,
    isUseLayout: true,
  },
  {
    path: "/profile/:infor",
    component: <Layout Component={UserInfo} />,
    isUseLayout: true,
  },
];
