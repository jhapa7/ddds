import React from "react";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAppContext } from "../../contexts/AppContext";
import Error from "../Error";
import Loader from "../Loader";
import Movie from "../Movie";

const PopularMovies = () => {
  const {
    popularLoading: loading,
    popularError: error,
    popularMovies: movies,
  } = useAppContext();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="pb-[2rem]">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
          Popular Movies
        </h1>
        {!loading ? (
          <div className="">
            <Swiper
              // install Swiper modules
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation
              mousewheel={{
                forceToAxis: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
            >
              {movies.results.map((movie, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Movie {...movie} />
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
      </div>
    </>
  );
};

export default PopularMovies;
