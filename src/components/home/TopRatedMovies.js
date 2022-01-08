import React from "react";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAppContext } from "../../contexts/AppContext";
import Error from "../Error";
import Loader from "../Loader";

import Movie from "../Movie";

const TopRatedMovies = () => {
  const {
    topRatedLoading: loading,
    topRatedError: error,
    topRatedMovies: movies,
  } = useAppContext();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="p-[2rem]">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
          Top Rated Movies
        </h1>
        {!loading ? (
          <div className="">
            <Swiper
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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

export default TopRatedMovies;
