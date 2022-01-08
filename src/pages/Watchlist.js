import React from "react";
import MovieList from "../features/watchlist/MovieList";
import TVList from "../features/watchlist/TVList";

const Watchlist = () => {
  return (
    <div className="bg-slate-800 min-h-screen p-[2rem]">
      <MovieList />
      <TVList />
    </div>
  );
};

export default Watchlist;
