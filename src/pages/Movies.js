import React, { useEffect } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Movie from "../components/Movie";
import { useAppContext } from "../contexts/AppContext";

const Movies = () => {
  const {
    popularLoading,
    popularError,
    popularMovies,
    topRatedLoading,
    topRatedError,
    topRatedMovies,
  } = useAppContext();

  useEffect(() => {
    document.title = "Movies | Cinemify";
  }, []);

  if (popularError) {
    return <Error />;
  }

  if (topRatedError) {
    return <Error />;
  }

  return (
    <div className=" p-[2rem]">
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
        Popular Movies
      </h1>

      {!popularLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2rem] mb-[2rem]">
          {popularMovies.results.map((movie, index) => {
            return <Movie key={index} {...movie} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[40vh]">
          <div>
            <Loader size={80} />
          </div>
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
        Top Rated Movies
      </h1>
      {!topRatedLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2rem] mb-[2rem]">
          {topRatedMovies.results.map((movie, index) => {
            return <Movie key={index} {...movie} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[40vh]">
          <div>
            <Loader size={80} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
