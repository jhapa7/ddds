import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import Movie from "../Movie";

const SearchMovies = () => {
  const {
    popularLoading: loading,
    popularError: error,
    popularMovies: movies,
  } = useAppContext();
  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <div className="p-[2rem]">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
          Popular Movies
        </h1>
        <div className="grid grid-cols-6 gap-[2rem]">
          {movies.results.map((movie, index) => {
            return <Movie key={index} {...movie} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SearchMovies;
