import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Movie from "../components/Movie";
import TV from "../components/TV";

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Search = () => {
  const { query } = useParams();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const URL = `${API_ENDPOINT}/search/multi?query=${query}&api_key=${API_KEY}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!query) {
        setLoading(false);
        setError(true);
        return;
      }
      const response = await fetch(URL);
      const data = await response.json();
      const newResults = data.results.filter(
        (result) => result.media_type !== "person"
      );
      setResults(newResults);
      setLoading(false);
      setError(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    document.title = `${query} | Cinemify`;
  }, [query]);

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

  if (results.length === 0) {
    return (
      <div className="bg-slate-800 h-[80vh] p-[2rem]">
        <h1 className="font-bold tracking-wider text-3xl text-yellow-500">
          Results for: {query}
        </h1>
        <div className="flex flex-col justify-center items-center h-full ">
          <h1 className="text-center font-bold text-4xl text-yellow-200 mb-[1rem]">
            Result not found!
          </h1>
          <h1 className="text-center font-bold text-xl font-mono text-white">
            No match found for your search query.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 min-h-[80vh] p-[2rem]">
      <div>
        <h1 className="font-bold tracking-wider text-2xl text-yellow-500  mb-[1.5rem]">
          Results for: {query}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[2rem]">
          {results.map((result, index) => {
            if (result.media_type === "movie") {
              return <Movie key={index} {...result} />;
            } else {
              return <TV key={index} {...result} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
