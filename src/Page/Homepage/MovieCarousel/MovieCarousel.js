import { Carousel } from "antd";
import MovieItem from "../MovieItem/MovieItem";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const MovieCarousel = ({ MovieList }) => {
  return (
    <div className="m-auto " style={{ maxWidth: 1200 }}>
      <Carousel className="mt-6" autoplay={true}>
        {MovieList.map((movieCarosel, index) => {
          return (
            <div key={index} className="px-2 md:px-0" style={{}}>
              <div
                className="grid grid-cols-3 gap-6 m-auto max-h-max "
                style={{}}
              >
                {movieCarosel.map((movie, index) => {
                  return (
                    <div key={index}>
                      <MovieItem Movie={movie} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
