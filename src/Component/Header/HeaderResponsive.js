import React from "react";
import { useWindowSize } from "../../Hook/useWindowSize";
import HeaderMobile from "./HeaderMobile";
import HeaderTheme from "./HeaderTheme";

export default function HeaderResponsive() {
  let windowSize = useWindowSize();
  const renderHeader = () => {
    {
      if (windowSize.width > 768) {
        return <HeaderTheme />;
      } else {
        return <HeaderMobile />;
      }
    }
  };
  return <div>{renderHeader()}</div>;
}
