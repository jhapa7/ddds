import React, { useState } from "react";
import { useFetch } from "../customHooks";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import NoImage from "../images/NoImage.png";
import Casts from "../components/movieInfo/Casts";
import Crews from "../components/movieInfo/Crews";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Trailer from "../components/movieInfo/MovieTrailer";
import { FaPlay } from "react-icons/fa";
import { fetchMovieById } from "../features/watchlist/movieSlice";
import Error from "../components/Error";
import Loader from "../components/Loader";

// Render a YouTube video player

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original";

const MovieInfo = () => {
  const { id } = useParams();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const URL = `${API_ENDPOINT}/movie/${id}?api_key=${API_KEY}`;
  const { loading, error, data: movie } = useFetch(URL);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="bg-slate-800 flex justify-center items-center h-[80vh]">
        <Loader size={100} />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  if (movie.status_code === 34) {
    if (process.env.NODE_ENV === "production") {
      console.clear();
    }
    return <NotFound />;
  }

  const {
    title,
    backdrop_path,
    poster_path,
    release_date,
    genres,
    runtime,
    vote_average,
    overview,
    tagline,
    spoken_languages,
    status,
    homepage,
  } = movie;

  const releaseYear = release_date?.substring(0, 4) || "N/A";
  const bgImageURL = `${IMAGE_ENDPOINT}/${backdrop_path}`;
  const posterURL = `${IMAGE_ENDPOINT}/${poster_path}`;
  const movieGenres = genres.map(({ name }) => name).join(", ") || "N/A";
  const languages =
    spoken_languages.map(({ name }) => name).join(", ") || "N/A";
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

  const formattedRuntime =
    Math.floor(runtime / 60) + "hr " + (runtime % 60) + "min";

  const closeTrailer = () => {
    setIsTrailerOpen(false);
    document.body.style.overflow = "unset";
  };

  const openTrailer = () => {
    setIsTrailerOpen(true);
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <div className="bg-zinc-900 lg:hidden">
        <div style={bgMobileImageCss}>
          <img
            src={poster_path ? posterURL : NoImage}
            alt={title}
            className="h-[10rem] sm:h-[15rem] rounded-xl shadow-sm drop-shadow-2xl"
          />
        </div>
        <div className="bg-slate-900 text-white p-[2rem]">
          <h1 className="text-3xl font-bold mb-[.5rem]">
            {title}
            <span className="ml-2 font-bold text-gray-400">
              ({releaseYear})
            </span>
          </h1>
          <div className="text-md text-gray-400 mb-[.5rem] flex gap-[1rem] items-center">
            <span className="rounded-sm text-[.7rem] font-bold uppercase bg-yellow-500 px-[4px] py-[1px] text-black mr-[.2rem]">
              movie
            </span>
            <div className="flex items-center gap-[1px]">
              <FaStar className="inline-block mr-[.2rem] text-yellow-500" />
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
                Release:
              </span>
              <span>{release_date}</span>
              <span className="text-md text-gray-200 font-semibold">
                Genre:
              </span>
              <span>{movieGenres}</span>
              <span className="text-md text-gray-200 font-semibold">
                Status:
              </span>
              <span>{status}</span>
              <span className="text-md text-gray-200 font-semibold">
                Language:
              </span>
              <span>{languages}</span>
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
                {homepage ? title : "N/A"}
              </a>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row gap-3">
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
              alt={title}
              className="h-[12rem] mb-[.5rem] md:mb-[2rem] sm:block md:h-full rounded-2xl drop-shadow-sm shadow-sm"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-[.5rem] line-clamp-2">
                {title}
                <span className="ml-2 font-bold text-gray-400">
                  ({releaseYear})
                </span>
              </h1>
              <div className="text-md text-gray-400 mb-[.5rem] flex gap-[1rem] items-center">
                <span className="rounded-sm text-[.7rem] font-bold uppercase bg-yellow-500 px-[4px] py-[1px] text-black mr-[.2rem]">
                  movie
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
                    Release:
                  </span>
                  <span>{release_date}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Genre:
                  </span>
                  <span>{movieGenres}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Status:
                  </span>
                  <span>{status}</span>
                  <span className="text-md text-gray-200 font-semibold">
                    Language:
                  </span>
                  <span>{languages}</span>
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
                    {homepage && title}
                  </a>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-3">
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
        <Trailer
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

export default MovieInfo;
