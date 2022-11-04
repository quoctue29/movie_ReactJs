import _ from "lodash";
import React, { useEffect, useState } from "react";
import { movieService } from "../../Services/movieService";
import MovieCarousel from "./MovieCarousel/MovieCarousel";
import "./Homepage.css";
import MovieBanner from "./MovieBanner/MovieBanner";
import MovieTab from "./MovieTab/MovieTab";
import { useDispatch } from "react-redux";
import { getMovieInforServ } from "../../Redux/Action/action";
import MovieTabResponsive from "./MovieTab/MovieTabResponsive";

export default function Homepage() {
  const [movieList, setMovieList] = useState([]);
  const [movieBanner, setMovieBanner] = useState([]);
  const dispatch = useDispatch();
  dispatch(getMovieInforServ());

  useEffect(() => {
    let fetchMovieList = async () => {
      let result = await movieService.getMovieList();
      result.data.content.splice(7, 5);
      let chunkedData = _.chunk(result.data.content, 3);
      setMovieList(chunkedData);
    };

    fetchMovieList();
    let fetchMovieBanner = async () => {
      let result = await movieService.getMovieBanner();
      setMovieBanner(result.data.content);
    };
    fetchMovieBanner();
  }, []);
  return (
    <>
      <div id="homepage_banner" className="max-h-max w-full">
        <MovieBanner MovieBanner={movieBanner} />
      </div>
      <div
        className="m-auto text-center mt-6 md:mt-12 text-2xl md:text-5xl font-bold align-middle h-10 md:h-16 border-b-4 border-gray-400"
        style={{
          maxWidth: 1200,
        }}
      >
        <span className="text-gray-600">PHIM</span>
      </div>
      <div id="homepage_carousel" className=" containe max-h-max mx-2">
        <MovieCarousel MovieList={movieList} />
      </div>
      <div
        className="m-auto text-center mt-6 md:mt-12 text-2xl md:text-5xl font-bold align-middle h-10 md:h-16  border-b-4 border-gray-400"
        style={{ maxWidth: 1200 }}
      >
        <span className="text-gray-600">CỤM RẠP</span>
      </div>
      <div className="mx-auto mt-6 mb-12" id="movie_tab">
        <MovieTabResponsive />
      </div>
    </>
  );
}
