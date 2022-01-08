import React from "react";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAppContext } from "../../contexts/AppContext";
import Error from "../Error";
import Loader from "../Loader";
import TV from "../TV";

const PopularTV = () => {
  const {
    popularTVLoading: loading,
    popularTVError: error,
    popularTVSeries: series,
  } = useAppContext();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="pb-[2rem]">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-[1.5rem]">
          Popular TV Shows
        </h1>
        {!loading ? (
          <div className="">
            <Swiper
              modules={[Navigation, A11y, Mousewheel, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
              {series.results.map((show, index) => {
                return (
                  <SwiperSlide key={index}>
                    <TV {...show} />
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

export default PopularTV;
