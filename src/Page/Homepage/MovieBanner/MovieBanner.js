import { Carousel, Modal } from "antd";

import { createRef, useRef, useState } from "react";
import MovieModal from "../Modal/MovieModal";

const MovieBanner = ({ MovieBanner }) => {
  const carouselRef = useRef();
  const handleNext = () => {
    return carouselRef.current.next();
  };
  const handlePrev = () => {
    return carouselRef.current.prev();
  };
  return (
    <div style={{ maxWidth: 1200 }} className="m-auto">
      <Carousel ref={carouselRef} autoplay={true}>
        {MovieBanner.map((banner, index) => {
          return (
            <div className="relative" key={index}>
              <button
                onClick={handlePrev}
                style={{ top: "50%", transform: "translateY(-50%)" }}
                className="absolute  left-2 z-10 "
              >
                <i
                  className="fa fa-angle-double-left text-gray-400 hover:text-white transition duration-300 opacity-60"
                  style={{ fontSize: 80 }}
                ></i>
              </button>
              <div
                className="banner_img"
                style={{
                  backgroundImage: `url(${banner.hinhAnh})`,
                  backgroundPosition: "center 0",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <button
                onClick={handleNext}
                style={{ top: "50%", transform: "translateY(-50%)" }}
                className="absolute  right-2 z-10 "
              >
                <i
                  className="fa fa-angle-double-right text-gray-400 hover:text-white transition duration-300 opacity-60"
                  style={{ fontSize: 80 }}
                ></i>
              </button>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MovieBanner;
