import React, { useEffect } from "react";
import RotateLoader from "react-spinners/RotateLoader";
import { useAppContext } from "../contexts/AppContext";
import Hero from "../components/home/Hero";
import PopularMovies from "../components/home/PopularMovies";
import PopularTV from "../components/home/PopularTV";
import TrendingMovies from "../components/home/TrendingMovies";
import TrendingTV from "../components/home/TrendingTV";
import TopRatedMovies from "../components/home/TopRatedMovies";
import TopRatedTV from "../components/home/TopRatedTV";

const Home = () => {
  const { loading } = useAppContext();

  useEffect(() => {
    document.title = "Home | Cinemify";
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800 flex justify-center items-center w-full h-[100vh] overflow-hidden relative z-[100]">
        <RotateLoader
          color="yellow"
          loading={loading}
          css={{ display: "block", margin: "0 auto" }}
          size={15}
        />
      </div>
    );
  }
  return (
    <>
      <Hero />
      <section className="p-[2rem]">
        <TrendingMovies />
        <TrendingTV />
        <PopularMovies />
        <PopularTV />
        <TopRatedMovies />
        <TopRatedTV />
      </section>
    </>
  );
};

export default Home;
