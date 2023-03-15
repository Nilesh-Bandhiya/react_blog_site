import { configureStore, combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./blogs-slice"
import usersReducer from "./users-slice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  blog: blogReducer,
  users:usersReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer
  // reducer: persistedReducer,
  // middleware: [thunk],
});

// export const persistor = persistStore(store);  
