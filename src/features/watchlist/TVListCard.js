import React from "react";
import { Link } from "react-router-dom";
import NoImage from "../../images/NoImage.png";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeTV } from "./TVSlice";
import { toast } from "react-toastify";

const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original";

const TVListCard = ({
  id,
  poster_path,
  original_name,
  first_air_date,
  vote_average,
}) => {
  const dispatch = useDispatch();
  const posterURL = `${IMAGE_ENDPOINT}/${poster_path}`;

  const removeFromWatchList = () => {
    dispatch(removeTV(id));
    toast.success("TV show removed successfully from watch list.", {
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
        <div className="relative">
          <img
            src={poster_path ? posterURL : NoImage}
            alt={original_name}
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
          <Link to={`/tvs/${id}`}>
            <h1 className="font-semibold overflow-hidden truncate cursor-pointer hover:text-yellow-500">
              {original_name}
            </h1>
          </Link>
          <div className="flex justify-between align-center">
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

export default TVListCard;
