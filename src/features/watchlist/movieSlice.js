import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// {
//       id: 429,
//       poster_path: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
//       release_date: "1966-12-23",
//       title: "The Good, the Bad and the Ugly",
//       vote_average: 8.5,
//     },
const initialState = {
  results: [],
  loading: false,
  error: undefined,
};

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchMovieById = createAsyncThunk(
  "watchlist/fetchMovieById",
  async (id, { getState, rejectWithValue }) => {
    const results = getState().movie.results;
    if (results.length && results.find((item) => item.id === id)) {
      return rejectWithValue({ status_message: "Already Added" });
    }
    const URL = `${API_ENDPOINT}/movie/${id}?api_key=${API_KEY}`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.status_message) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    removeMovie: (state, action) => {
      state.results = state.results.filter(
        (item) => item.id !== action.payload
      );
      // state.results.filter((result) => result.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.results.push(action.payload);
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchMovieById.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchMovieById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.status_message;
      // console.log(action.payload);
    });
  },
});

export const { removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
