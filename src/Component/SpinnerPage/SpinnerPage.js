import React from "react";
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";

export default function SpinnerPage() {
  let { isShowSpinner } = useSelector((state) => {
    return state.spinnerReducer;
  });
  return isShowSpinner ? (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <PropagateLoader color="#fff" />
    </div>
  ) : (
    <div></div>
  );
}
