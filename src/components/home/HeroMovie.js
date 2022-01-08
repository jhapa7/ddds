import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieById } from "../../features/watchlist/movieSlice";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { BiMovie } from "react-icons/bi";

const IMAGE_ENPOINT = "https://image.tmdb.org/t/p/original";

const HeroMovie = ({
  id,
  media_type,
  title,
  vote_average,
  release_date,
  backdrop_path,
  overview,
}) => {
  const dispatch = useDispatch();
  const imageURL = `${IMAGE_ENPOINT}/${backdrop_path}`;
  const releaseYear = release_date?.substring(0, 4) || "N/A";

  const addToWatchList = async () => {
    const response = await dispatch(fetchMovieById(Number(id)));
    if (
      response.hasOwnProperty("error") &&
      response.payload.status_message === "Already Added"
    ) {
      toast.error("You have already added to watch list!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.success("Successfully added to watch list!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-black via-slate-00 to-slate-900 relative h-[50vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh]">
        <img
          src={imageURL}
          alt="ss"
          className="w-full h-full object-center opacity-50"
        />
        <div className="text-left absolute bottom-0 text-white m-[2rem] mb-[2.2rem] sm:m-[4rem]">
          <h1 className="font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl capitalize drop-shadow-2xl mb-[.2rem] md:mb-[1.5rem]  line-clamp-2">
            {title}
          </h1>
          <div className="text-md text-gray-400 mb-[.5rem] flex gap-[1rem] items-center">
            <span className="rounded-sm text-[.7rem] font-bold uppercase bg-yellow-500 px-[4px] py-[1px] text-black mr-[.2rem]">
              {media_type}
            </span>
            <div className="flex items-center gap-[1px]">
              <FaStar className="inline-block mr-[.2rem] text-yellow-500" />
              <span className="font-bold">{vote_average}</span>
            </div>
            <span className="font-bold">{releaseYear} </span>
          </div>
          <p className="text-gray-100 mb-[1rem] md:mb-[2rem] max-w-[40rem] md:text-lg line-clamp-2 md:line-clamp-4">
            {overview}
          </p>
          <div className="flex gap-[.5rem] xs:gap-[1rem]">
            <Link
              to={`/movies/${id}`}
              className="group cursor-pointer text-black border-[3px] md:border-4 border-yellow-500 bg-yellow-500 font-bold px-[.3rem] xs:px-[1rem] py-[.5rem] rounded-md text-sm md:text-lg hover:text-white hover:bg-transparent"
            >
              <BiMovie className="inline-block mr-[.4rem] text-xl group-hover:text-yellow-500" />
              <span>View info</span>
            </Link>
            <div
              className="group cursor-pointer hover:text-black border-[3px] md:border-4 border-yellow-500 hover:bg-yellow-500 font-bold px-[.3rem] xs:px-[1rem] py-[.5rem] rounded-md text-sm md:text-lg text-white bg-transparent  "
              onClick={addToWatchList}
            >
              <BsBookmarkHeartFill className="inline-block mr-[.4rem] text-xl text-yellow-500 group-hover:text-black" />
              <span>Add to watch list</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroMovie;
