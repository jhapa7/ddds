import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/watchlist/movieSlice";
import TVReducer from "../features/watchlist/TVSlice";

// resux persist
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  movie: movieReducer,
  tv: TVReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
