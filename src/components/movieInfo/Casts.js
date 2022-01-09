import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import { useFetch } from "../../customHooks";

import Card from "./CastCard";
import Loader from "../Loader";
import Error from "../Error";

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Casts = () => {
  const { id } = useParams();
  const location = useLocation();
  let URL = "";
  if (location.pathname.includes("/movies/")) {
    URL = `${API_ENDPOINT}/movie/${id}/credits?api_key=${API_KEY}`;
  } else {
    URL = `${API_ENDPOINT}/tv/${id}/credits?api_key=${API_KEY}`;
  }
  const { loading, error, data: credits } = useFetch(URL);

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <div className="p-[2rem]">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500  mb-[1.5rem]">
          Top Cast
        </h1>
        {!loading ? (
          <div className="">
            <Swiper
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              mousewheel={{
                forceToAxis: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 7,
                  spaceBetween: 30,
                },
              }}
            >
              {credits.cast.map((cast) => {
                return (
                  <SwiperSlide key={uuidv4()}>
                    <Card {...cast} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[40vh]">
            <div>
              <Loader size={80} />
            </div>
          </div>
        )}
        {!Array.isArray(credits.cast) ||
          (!credits.cast.length && (
            <h1 className="text-center text-3xl py-5 text-white font-mono">
              No cast found
            </h1>
          ))}
      </div>
    </div>
  );
};

export default Casts;
