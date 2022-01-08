import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Navigation, A11y, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useFetch } from "../../customHooks";

import Card from "./CrewCard";
import Loader from "../Loader";

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Crews = () => {
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
    return <h1>errror</h1>;
  }

  // if (!Array.isArray(credits.crew) || !credits.crew.length) {
  //   return (
  //     <div className="px-[2rem] pb-[2rem]">
  //       <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500  mb-[1.5rem]">
  //         Crew
  //       </h1>
  //       <h1 className="text-center text-3xl py-5 text-white font-mono">
  //         No crew found
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="px-[2rem] pb-[2rem]">
        <h1 className="text-xl sm:text-3xl font-bold text-yellow-500  mb-[1.5rem]">
          Crew
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
                  slidesPerView: 7,
                  spaceBetween: 30,
                },
              }}
            >
              {credits.crew
                //   .filter((member) => member.profile_path != null)
                .map((member, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Card {...member} />
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
        {!Array.isArray(credits.crew) ||
          (!credits.crew.length && (
            <h1 className="text-center text-3xl py-5 text-white font-mono">
              No crew found
            </h1>
          ))}
      </div>
    </div>
  );
};

export default Crews;
