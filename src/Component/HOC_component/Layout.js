import React from "react";
import HeaderTheme from "../Header/HeaderTheme";
import Footer from "../Footer/Footer";
import HeaderResponsive from "../Header/HeaderResponsive";

export default function Layout({ Component }) {
  return (
    <div className="flex flex-col " style={{ minHeight: "100vh" }}>
      <HeaderResponsive />
      <div
        className=" flex-grow max-h-max"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        <Component />
      </div>
      <Footer />
    </div>
  );
}
