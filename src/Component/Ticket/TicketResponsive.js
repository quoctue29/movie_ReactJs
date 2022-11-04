import React from "react";
import { useWindowSize } from "../../Hook/useWindowSize";
import Ticket from "./Ticket";
import TicketMobile from "./TicketMobile";

export default function TicketResponsive({ maPhim, modalWidth }) {
  let windowSize = useWindowSize();
  const renderTicket = () => {
    if (windowSize.width > 1024) {
      return <Ticket maPhim={maPhim} modalWidth={modalWidth} />;
    } else {
      return <TicketMobile maPhim={maPhim} modalWidth={modalWidth} />;
    }
  };
  return <div>{renderTicket()}</div>;
}
