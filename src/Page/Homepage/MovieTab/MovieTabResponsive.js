import React from "react";
import { useWindowSize } from "../../../Hook/useWindowSize";
import MovieTab from "./MovieTab";
import MovieTabItemTablet from "./MovieTabItemTablet";
import MovieTabMobile from "./MovieTabMobile";
import MovieTabTablet from "./MovieTabTablet";

export default function MovieTabResponsive() {
  let windowSize = useWindowSize();
  const renderTab = () => {
    if (windowSize.width > 1024) {
      return <MovieTab />;
    } else if (windowSize.width > 640) {
      return <MovieTabTablet />;
    } else {
      return <MovieTabMobile />;
    }
  };
  return <div>{renderTab()}</div>;
}
