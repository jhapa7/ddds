import React from "react";
import { FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { useFetch } from "../../customHooks";
import Error from "../Error";
import Loader from "../Loader";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const Youtube_URL = "https://www.youtube.com/watch?v=";

const TVTrailer = ({
  id,
  isTrailerOpen,
  setIsTrailerOpen,
  openTrailer,
  closeTrailer,
}) => {
  const URL = `${API_URL}/tv/${id}/videos?api_key=${API_KEY}`;
  const { loading, error, data: videos } = useFetch(URL);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  const trailer = videos.results.find(
    (video) => video.type.toLowerCase() === "trailer"
  );

  if (!trailer) {
    return (
      <div className="fixed top-0 left-0 bottom-0 right-0 w-screen h-screen z-[999] bg-black">
        <div
          className="absolute top-1 left-1 rounded-sm cursor-pointer z-[1001]"
          onClick={closeTrailer}
        >
          <FaTimes className="text-white text-4xl font-bold p-[.1rem] cursor-pointer " />
        </div>
        <div className="grid items-center w-full h-full p-[1rem]">
          <h1 className="text-3xl text-center text-white font-bold">
            Sorry trailer not found!
          </h1>
        </div>
      </div>
    );
  }

  const trailerURL = Youtube_URL + trailer.key;
  return (
    <div>
      <div className="fixed top-0 left-0 bottom-0 right-0 w-screen h-screen z-[999] bg-black">
        <div
          className="absolute top-2 left-2 rounded-sm cursor-pointer z-[1001]"
          onClick={closeTrailer}
        >
          <FaTimes className="text-white text-3xl font-bold p-[.1rem] cursor-pointer " />
        </div>
        <div className="grid items-center w-full h-full p-[1rem]">
          <div className="player-wrapper ">
            <ReactPlayer
              url={trailerURL}
              className="react-player"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVTrailer;
