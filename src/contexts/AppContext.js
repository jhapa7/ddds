import { useContext, createContext } from "react";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../customHooks";

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const URL = `${API_ENDPOINT}/trending/movie/week?api_key=${API_KEY}`;
  const TVURL = `${API_ENDPOINT}/trending/tv/week?api_key=${API_KEY}`;
  const topRatedURL = `${API_ENDPOINT}/movie/top_rated?api_key=${API_KEY}`;
  const popularURL = `${API_ENDPOINT}/movie/popular?api_key=${API_KEY}`;
  const upcomingURL = `${API_ENDPOINT}/movie/upcoming?api_key=${API_KEY}`;
  const popularTVURL = `${API_ENDPOINT}/tv/popular?api_key=${API_KEY}`;
  const topRatedTVURL = `${API_ENDPOINT}/tv/top_rated?api_key=${API_KEY}`;

  const { loading, error, data: movies } = useFetch(URL);
  const { loading: TVLoading, error: TVError, data: tvs } = useFetch(TVURL);
  const {
    loading: popularLoading,
    error: popularError,
    data: popularMovies,
  } = useFetch(popularURL);
  const {
    loading: popularTVLoading,
    error: popularTVError,
    data: popularTVSeries,
  } = useFetch(popularTVURL);
  const {
    loading: upcomingLoading,
    error: upcomingError,
    data: upcomingMovies,
  } = useFetch(upcomingURL);
  const {
    loading: topRatedLoading,
    error: topRatedError,
    data: topRatedMovies,
  } = useFetch(topRatedURL);
  const {
    loading: topRatedTVLoading,
    error: topRatedTVError,
    data: topRatedTVSeries,
  } = useFetch(topRatedTVURL);

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        movies,
        TVLoading,
        TVError,
        tvs,
        popularLoading,
        popularError,
        popularMovies,
        popularTVLoading,
        popularTVError,
        popularTVSeries,
        upcomingLoading,
        upcomingError,
        upcomingMovies,
        topRatedLoading,
        topRatedError,
        topRatedMovies,
        topRatedTVLoading,
        topRatedTVError,
        topRatedTVSeries,
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
