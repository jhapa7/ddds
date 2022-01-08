import React from "react";
import { Link } from "react-router-dom";
import NoImage from "../../images/NoImage.png";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeMovie } from "./movieSlice";
import { toast } from "react-toastify";

const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original";

const MovieListCard = ({
  id,
  poster_path,
  title,
  release_date,
  vote_average,
}) => {
  const dispatch = useDispatch();
  const posterURL = `${IMAGE_ENDPOINT}/${poster_path}`;

  const removeFromWatchList = () => {
    dispatch(removeMovie(id));
    toast.success("Movie removed successfully from watch list.", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };
  return (
    <>
      <div className="text-white rounded-lg drop-shadow-2xl relative">
        <div class="relative">
          <img
            src={poster_path ? posterURL : NoImage}
            alt={title}
            effect="blur"
            className="rounded-t-lg drop-shadow-2xl w-full h-[180px] xs:h-[280px] sm:h-[350px] md:h-[300px]  xl:h-[320px]"
            loading="lazy"
          />
          <div
            className="absolute bottom-1 right-1  py-[7px] px-[6px] bg-red-900 rounded-md font-semibold uppercase cursor-pointer"
            onClick={removeFromWatchList}
          >
            <FaTrashAlt className="inline-block text-xl" />
          </div>
        </div>
        <div className="p-[.5rem] bg-gray-900 rounded-b-lg drop-shadow-2xl">
          <Link to={`/movies/${id}`}>
            <h1 className="font-semibold overflow-hidden truncate cursor-pointer hover:text-yellow-500">
              {title}
            </h1>
          </Link>
          <div className="flex justify-between align-center">
            <p className="truncate">{release_date}</p>
            <div className="flex items-center gap-[1px]">
              <FaStar className="inline-block mr-[.2rem] text-yellow-500" />
              <span className="text-sm font-bold">{vote_average}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieListCard;
