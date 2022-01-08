import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  loading: false,
  error: false,
};

const API_ENDPOINT = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const addTV = createAsyncThunk(
  "watchlist/addTV",
  async (id, { getState, rejectWithValue }) => {
    const results = getState().tv.results;
    if (results.length && results.find((item) => item.id === id)) {
      return rejectWithValue({ status_message: "Already Added" });
    }
    const URL = `${API_ENDPOINT}/tv/${id}?api_key=${API_KEY}`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.status_message) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const TVSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    removeTV: (state, action) => {
      state.results = state.results.filter(
        (item) => item.id !== action.payload
      );
      // state.results.filter((result) => result.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTV.fulfilled, (state, action) => {
      state.results.push(action.payload);
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addTV.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(addTV.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.status_message;
    });
  },
});

export const { removeTV } = TVSlice.actions;

export default TVSlice.reducer;
