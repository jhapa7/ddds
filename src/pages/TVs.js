import React from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import TV from "../components/TV";
import { useAppContext } from "../contexts/AppContext";

const TVs = () => {
  const {
    popularTVLoading,
    popularTVError,
    popularTVSeries,
    topRatedTVLoading,
    topRatedTVError,
    topRatedTVSeries,
  } = useAppContext();

  if (popularTVError) {
    return <Error />;
  }

  if (topRatedTVError) {
    return <Error />;
  }
  return (
    <div className="p-[2rem]">
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
        Popular TV Shows
      </h1>

      {!popularTVLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2rem] mb-[2rem]">
          {popularTVSeries.results.map((tv, index) => {
            return <TV key={index} {...tv} />;
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
        Top Rated TV Shows
      </h1>
      {!topRatedTVLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2rem] mb-[2rem]">
          {topRatedTVSeries.results.map((tv, index) => {
            return <TV key={index} {...tv} />;
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

export default TVs;
