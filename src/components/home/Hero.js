import React from "react";
import { Carousel } from "react-responsive-carousel";
import HeroMovie from "./HeroMovie";
import { useAppContext } from "../../contexts/AppContext";

const Hero = () => {
  const { movies } = useAppContext();

  return (
    <section className="w-full bg-gray-200 overflow-hidden relative">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showIndicators={true}
        swipeable={true}
        showStatus={false}
        autoPlay={true}
        emulateTouch={true}
      >
        {movies.results.slice(0, 7).map((movie, index) => {
          return <HeroMovie key={index} {...movie} />;
        })}
      </Carousel>
    </section>
  );
};

export default Hero;
