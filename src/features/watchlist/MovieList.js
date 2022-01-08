import React from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import MovieListCard from "./MovieListCard";

const MovieList = () => {
  const movie = useSelector((state) => state.movie);
  const { loading, results } = movie;

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
        Movie Watchlist
      </h1>
      {loading && <Loader size={80} />}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2rem] mb-[2rem]">
          {results.map((movie, index) => {
            return <MovieListCard key={index} {...movie} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-[2rem] gap-[1rem]">
          <BsBookmarkHeartFill className="text-[7rem] text-yellow-200" />
          <h1 className="text-center text-xl md:text-2xl font-mono font-bold text-gray-400">
            Your movie watchlist is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default MovieList;
