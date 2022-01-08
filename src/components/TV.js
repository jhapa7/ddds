import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import NoImage from "../images/NoImage.png";

const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original";

const Movie = ({
  id,
  poster_path,
  original_name,
  first_air_date,
  vote_average,
}) => {
  const posterURL = `${IMAGE_ENDPOINT}/${poster_path}`;
  return (
    <>
      <Link
        to={`/tvs/${id}`}
        className="text-white rounded-lg drop-shadow-2xl relative"
      >
        <div className="relative">
          <img
            src={poster_path ? posterURL : NoImage}
            alt={original_name}
            className="rounded-t-lg drop-shadow-2xl w-full h-[180px] xs:h-[290px] sm:h-[400px] md:h-[300px]  xl:h-[320px]"
            loading="lazy"
          />
          <div className="absolute top-1 right-1 py-[3px] px-[6px] text-black bg-yellow-500 rounded-sm font-bold uppercase text-xs">
            TV
          </div>
        </div>
        <div className="p-[.5rem] bg-gray-900 rounded-b-lg drop-shadow-2xl">
          <h1 className="font-semibold overflow-hidden truncate">
            {original_name}
          </h1>
          <div className="flex justify-between align-center">
            <p className="truncate">{first_air_date}</p>
            <div className="flex items-center gap-[1px]">
              <FaStar className="inline-block mr-[.2rem] text-yellow-500" />
              <span className="text-sm font-bold">{vote_average}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Movie;
