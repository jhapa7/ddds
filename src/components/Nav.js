import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaHome, FaListAlt } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";

const Nav = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const location = useLocation();
  const { loading } = useAppContext();

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isSideNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSideNavOpen]);

  if (loading) {
    return <h1></h1>; //eslint-disable-line
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search/${query}`);
      setIsSideNavOpen(false);
      setQuery("");
    }
  };
  return (
    <nav
      className={`w-full ${
        isHome ? "absolute top-0 z-50" : "bg-slate-900"
      } px-[2rem] py-[.8rem] flex justify-between  items-center`}
    >
      <Link
        to="/"
        className="text-yellow-400 font-extrabold px-[.5rem] py-[.2rem] tracking-widest uppercase text-[1.7rem]"
      >
        cinemify
      </Link>
      <div className="hidden lg:flex gap-[3rem]">
        <Link
          to="/"
          className="font-semibold text-lg text-white hover:text-yellow-500"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="font-semibold text-lg text-white hover:text-yellow-500"
        >
          Movies
        </Link>
        <Link
          to="/tvs"
          className="font-semibold text-lg text-white hover:text-yellow-500"
        >
          TV Shows
        </Link>
        <Link
          to="/watchlist"
          className="font-semibold text-lg text-white hover:text-yellow-500"
        >
          Watchlist
        </Link>
      </div>
      <form
        className="hidden md:block relative bg-slate-900 opacity-70 rounded-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border-yellow-500 border-2 pl-[1.5rem] pr-[2.3rem] py-[.5rem] w-[20rem] rounded-full bg-transparent text-white text-xl placeholder:font-thin placeholder:text-lg placeholder:text-white"
          placeholder="Search movies or series"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button>
          <FaSearch className="absolute right-4 top-4 text-xl text-yellow-500 hover:opacity-70" />
        </button>
      </form>
      <FaBars
        className="lg:hidden text-2xl block text-white cursor-pointer hover:opacity-70"
        onClick={toggleSideNav}
      />

      <div
        className={`${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } fixed bg-[rgba(0,0,0,.8)] w-screen h-screen top-0 left-0  z-[1000] transition-all rounded-sm drop-shadow-2xl shadow-2xl text-white`}
      >
        <div className="bg-slate-900 h-screen  p-[2rem]  w-full xs:w-[22rem]">
          <div className="flex justify-between items-center mb-[1.5rem]">
            <Link
              to="/"
              className="text-yellow-500 font-extrabold px-[.5rem] py-[.2rem] tracking-widest uppercase text-xl rounded-md"
            >
              cinemify
            </Link>
            <FaTimes
              className="text-3xl text-white cursor-pointer hover:opacity-70"
              onClick={toggleSideNav}
            />
          </div>
          <div className="grid gap-[1rem]">
            <Link
              to="/"
              onClick={toggleSideNav}
              className="flex gap-[1.5rem]  p-[.5rem] rounded-md hover:bg-slate-700"
            >
              <FaHome className="text-yellow-500 text-3xl w-[2rem] " />
              <span className="font-semibold text-xl text-center text-gray-300">
                Home
              </span>
            </Link>
            <Link
              to="/movies"
              onClick={toggleSideNav}
              className="flex gap-[1.5rem]  p-[.5rem] rounded-md hover:bg-slate-700"
            >
              <BiCameraMovie className="text-yellow-500 text-3xl w-[2rem] " />
              <span className="font-semibold text-xl text-center text-gray-300">
                Movies
              </span>
            </Link>
            <Link
              to="/tvs"
              onClick={toggleSideNav}
              className="flex gap-[1.5rem]  p-[.5rem] rounded-md hover:bg-slate-700"
            >
              <FiTv className="text-yellow-500 text-3xl w-[2rem] " />
              <span className="font-semibold text-xl text-center text-gray-300">
                TV Shows
              </span>
            </Link>
            <Link
              to="/watchlist"
              onClick={toggleSideNav}
              className="flex gap-[1.5rem]  p-[.5rem] rounded-md hover:bg-slate-700"
            >
              <FaListAlt className="text-yellow-500 text-3xl w-[2rem] " />
              <span className="font-semibold text-xl text-center text-gray-300">
                Watchlist
              </span>
            </Link>
            <form
              className="relative bg-slate-900 opacity-70 rounded"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="border-yellow-500 border-2 pl-[1.5rem] pr-[2.3rem] py-[.5rem] w-full rounded-lg bg-transparent text-white text-xl placeholder:font-thin placeholder:text-lg placeholder:text-white"
                placeholder="Search movies or series"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <button>
                <FaSearch className="absolute right-4 top-4 text-xl text-yellow-500 hover:opacity-70" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
