import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { AppProvider } from "./contexts/AppContext";
import MovieInfo from "./pages/MovieInfo";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
import TVInfo from "./pages/TVInfo";
import Search from "./pages/Search";
import TVs from "./pages/TVs";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <AppProvider>
                  <Home />
                </AppProvider>
              }
            />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieInfo />} />
            <Route path="/tvs" element={<TVs />} />
            <Route path="/tvs/:id" element={<TVInfo />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
