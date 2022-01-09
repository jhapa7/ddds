import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Movie from "../Movie";
import Loader from "../Loader";
import Error from "../Error";

const TrendingMovies = () => {
  const { loading, error, movies } = useAppContext();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="pb-[2rem]">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
          Trending Movies
        </h1>
        {!loading ? (
          <div className="">
            <Swiper
              // install Swiper modules
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

export default TrendingMovies;
