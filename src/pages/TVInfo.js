import React, { useState } from "react";
import { useFetch } from "../customHooks";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Casts from "../components/movieInfo/Casts";
import Crews from "../components/movieInfo/Crews";
import TVTrailer from "../components/movieInfo/TVTrailer";
import NoImage from "../images/NoImage.png";
import { useDispatch } from "react-redux";
import { addTV } from "../features/watchlist/TVSlice";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaPlay, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original";

const TVInfo = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const URL = `${API_ENDPOINT}/tv/${id}?api_key=${API_KEY}`;
  const { loading, error, data: tvs } = useFetch(URL);

  if (loading) {
    return (
      <div className="bg-slate-800 flex justify-center items-center h-[80vh]">
        <Loader size={100} />
      </div>
    );
  }

  if (error) {
    return <h1>Error!!!</h1>;
  }

  if (tvs.status_code === 34) {
    if (process.env.NODE_ENV === "production") {
      console.clear();
    }
    return <NotFound />;
  }

  const addToWatchList = async () => {
    const response = await dispatch(addTV(Number(id)));
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

  const {
    original_name,
    backdrop_path,
    poster_path,
    genres,
    episode_run_time,
    vote_average,
    overview,
    tagline,
    first_air_date,
    spoken_languages,
    status,
    number_of_episodes,
    number_of_seasons,
    homepage,
    networks,
  } = tvs;

  // console.log(tv);
  const bgImageURL = `${IMAGE_ENDPOINT}/${backdrop_path}`;
  const posterURL = `${IMAGE_ENDPOINT}/${poster_path}`;
  const tvGenres = genres.map(({ name }) => name).join(", ") || "N/A";
  const languages =
    spoken_languages.map(({ name }) => name).join(", ") || "N/A";
  const tvNetworks = networks.map(({ name }) => name).join(", ") || "N/A";
  const releaseYear = first_air_date?.substring(0, 4) || "N/A";
  const bgImageCss = {
    width: "100%",
    height: "80vh",
    background: `linear-gradient(rgba(0,0,0,0.9), rgba(24,27,15,0.7)), url("${bgImageURL}") center/cover`,
    display: "grid",
    placeItems: "center",
  };
  const bgMobileImageCss = {
    background: `linear-gradient(rgba(0,0,0,0.9), rgba(24,27,15,0.3)), url("${bgImageURL}") center/cover`,
    padding: "2rem",
  };

  const formattedRuntime =
    episode_run_time <= 60
      ? `${episode_run_time} min`
      : `${Math.floor(episode_run_time / 60)} hr ${episode_run_time % 60} min`;

  const closeTrailer = () => {
    setIsTrailerOpen(false);
    document.body.style.overflow = "unset";
  };

  const openTrailer = () => {
    setIsTrailerOpen(true);
    document.body.style.overflow = "hidden";
  };
  console.log(tvs);

  return (
    <>
      <div className="bg-zinc-900 lg:hidden">
        <div style={bgMobileImageCss}>
          <img
            src={poster_path ? posterURL : NoImage}
            alt={original_name}
            className="h-[10rem] sm:h-[15rem] rounded-xl shadow-sm drop-shadow-2xl"
          />
        </div>
        <div className="bg-slate-900 text-white p-[2rem]">
          <h1 className="text-3xl font-bold mb-[.5rem]">
            {original_name}
            <span className="ml-2 font-bold text-gray-400">
              ({releaseYear})
            </span>
          </h1>
          <div className="text-md text-gray-400 mb-[.5rem] flex gap-[1rem] items-center">
            <span className="rounded-sm text-[.7rem] font-bold uppercase bg-yellow-500 px-[4px] py-[1px] text-black mr-[.2rem]">
              tv
            </span>
            <div className="flex items-center gap-[1px]">
              <FaStar className="inline-block mr-[.2rem] text-yellow-500 text-yellow-500" />
              <span className=" font-bold">{vote_average}</span>
            </div>
            <span>{formattedRuntime} </span>
          </div>
          <h1 className="font-bold text-gray-200 text-md mb-[.2rem]">
            Overview:
          </h1>
          <p className="text-md text-gray-200 max-w-[40rem] mb-[.5rem]">
            {overview}
          </p>
          <div className="flex gap-[.1rem] mb-[1rem]">
            <div className="grid grid-cols-[1fr_2fr] gap-[2px] items-center">
              <span className="text-md text-gray-200 font-semibold">
                First aired:
              </span>
              <span>{first_air_date}</span>
              <span className="text-md text-gray-200 font-semibold">
                Genre:
              </span>
              <span>{tvGenres}</span>
              <span className="text-md text-gray-200 font-semibold">
                Status:
              </span>
              <span>
                {status} (Seasons: {number_of_seasons}, Episodes:{" "}
                {number_of_episodes})
              </span>
              <span className="text-md text-gray-200 font-semibold">
                Language:
              </span>
              <span>{languages}</span>
              <span className="text-md text-gray-200 font-semibold">
                Network:
              </span>
              <span>{tvNetworks}</span>
              <span className="text-md text-gray-200 font-semibold">
                Tagline:
              </span>
              <span>{tagline || "N/A"}</span>
              <span className="text-md text-gray-200 font-semibold">
                Official site:
              </span>
              <a
                href={homepage || ""}
                target="_blank"
                rel="noreferrer"
                className="text-md text-sky-500 hover:text-yellow-500"
              >
                {homepage ? original_name : "N/A"}
              </a>
            </div>
          </div>
          <div class="flex flex-col xs:flex-row gap-3">
            <div
              className="cursor-pointer text-center text-black font-bold bg-yellow-500 px-[1rem]  sm:px-[.5rem] py-[.5rem] rounded-md text-sm  hover:bg-white"
              onClick={openTrailer}
            >
              <FaPlay className="inline-block mr-[.4rem]" />
              <span>Watch trailer</span>
            </div>
            <div
              className="cursor-pointer text-center text-black font-bold hover:bg-yellow-500  px-[1rem] sm:px-[.5rem] py-[.5rem] rounded-md text-sm  bg-white"
              onClick={addToWatchList}
            >
              <BsBookmarkHeartFill className="inline-block mr-[.4rem]" />
              <span>Add to watch list</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 min-h-[80vh] overflow-hidden hidden lg:block">
        <div style={bgImageCss}>
          <div className="md:flex gap-[4rem] p-[2rem] md:p-[4rem] h-full md:h-[80vh]">
            <img
              src={poster_path ? posterURL : NoImage}
              alt={original_name}
              className="h-[12rem] mb-[.5rem] md:mb-[2rem] sm:block md:h-full rounded-2xl drop-shadow-sm shadow-sm"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-[.5rem] line-clamp-2">
                {original_name}
                <span className="ml-2 font-bold text-gray-400">
                  ({releaseYear})
                </span>
              </h1>
              <div className="text-md text-gray-400 mb-[.5rem] flex gap-[1rem] items-center">
                <span className="rounded-sm text-[.7rem] font-bold uppercase bg-yellow-500 px-[4px] py-[1px] text-black mr-[.2rem]">
                  tv
                </span>
                <div className="flex items-center gap-[1px]">
                  <FaStar className="inline-block mr-[.2rem] text-yellow-500" />
                  <span className=" font-bold">{vote_average}</span>
                </div>
                <span>{formattedRuntime} </span>
              </div>
              <h1 className="text-md font-bold text-gray-200 mb-[.2rem]">
                Overview:
              </h1>
              <p className=" text-gray-200 max-w-[40rem] mb-[.5rem] line-clamp-3">
                {overview}
              </p>
              <div className="flex gap-[.1rem] mb-[1.2rem]">
                <div className="grid grid-cols-[1fr_2fr] gap-[4px] items-center">
                  <span className="text-md text-gray-200 font-semibold">
                    First aired:
                  </span>
                  <span>{first_air_date}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Genre:
                  </span>
                  <span>{tvGenres}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Status:
                  </span>
                  <span>
                    {status} (Seasons: {number_of_seasons}, Episodes:{" "}
                    {number_of_episodes})
                  </span>
                  <span className="text-md text-gray-200 font-semibold">
                    Language:
                  </span>
                  <span>{languages}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Network:
                  </span>
                  <span>{tvNetworks}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Tagline:
                  </span>
                  <span>{tagline || "N/A"}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Official site:
                  </span>
                  <a
                    href={homepage || ""}
                    target="_blank"
                    rel="noreferrer"
                    className="text-md text-sky-500 hover:text-yellow-500"
                  >
                    {homepage ? original_name : "N/A"}
                  </a>
                </div>
              </div>
              <div class="flex flex-col xs:flex-row gap-3">
                <div
                  className="cursor-pointer text-black font-bold bg-yellow-500 px-[1.2rem] py-[.5rem] rounded-md text-md  hover:bg-white"
                  onClick={openTrailer}
                >
                  <FaPlay className="inline-block mr-[.4rem]" />
                  <span className="align-middle">Watch trailer</span>
                </div>
                <div
                  className="cursor-pointer text-black font-bold hover:bg-yellow-500  px-[1.2rem] py-[.5rem] rounded-md text-md  bg-white"
                  onClick={addToWatchList}
                >
                  <BsBookmarkHeartFill className="inline-block mr-[.4rem]" />
                  <span className="align-middle">Add to watch list</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Casts />
      <Crews />
      {isTrailerOpen ? (
        <TVTrailer
          id={id}
          isTrailerOpen={isTrailerOpen}
          setIsTrailerOpen={setIsTrailerOpen}
          closeTrailer={closeTrailer}
          openTrailer={openTrailer}
        />
      ) : (
        <></>
      )}
    </>
  );
};

//  <div className="bg-zinc-900 min-h-[80vh] overflow-hidden">
//    <div style={bgImageCss}>
//      <div className="md:flex gap-[4rem] p-[2rem] md:p-[4rem] h-full md:h-[80vh]">
//        <img
//          src={poster_path ? posterURL : NoImage}
//          alt={original_name}
//          className="h-[12rem] mb-[.5rem] md:mb-[2rem] sm:block md:h-full rounded-2xl drop-shadow-sm shadow-sm"
//        />
//        <div className="text-white">
//          <h1 className="text-xl md:text-3xl font-bold md:mb-[.2rem]">
//            {original_name}
//            <span className="font-bold text-gray-400"></span>
//          </h1>
//          <div className=" text-sm md:text-md font-semibold text-gray-300">
//            {tvGenres} | {formattedRuntime}
//          </div>
//          <div className="text-sm md:text-xl text-gray-400 md:mb-[.2rem]">
//            ⭐<span className="font-bold">{vote_average}</span>
//          </div>
//          <p className=" text-sm block italic md:text-lg font-semibold text-gray-300 mb-[.3rem] md:mb-[1rem]">
//            {tagline}
//          </p>
//          <h1 className="font-bold text:sm md:text-xl">Overview</h1>
//          <p className="text-sm font-semibold md:text-md text-gray-200 md:tracking-wide md:leading-7 max-w-[40rem] my-[.2rem] md:my-[.8rem] line-clamp-6 lg:line-clamp-none">
//            {overview}
//          </p>
//          <div class="grid grid-cols-3 gap-3">
//            <div
//              className="cursor-pointer text-black font-bold bg-yellow-500  px-[1.5rem] py-[.5rem] rounded-md text-sm md:text-base  hover:bg-white"
//              onClick={openTrailer}
//            >
//              <FaPlay className="inline-block mr-[.4rem]" />
//              <span>Watch trailer</span>
//            </div>
//            <div
//              className="cursor-pointer text-black font-bold hover:bg-yellow-500  px-[1.5rem] py-[.5rem] rounded-md text-sm md:text-base  bg-white"
//              onClick={addToWatchList}
//            >
//              <BsBookmarkHeartFill className="inline-block mr-[.4rem]" />
//              <span>Add to watch list</span>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>;

export default TVInfo;
