import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import usersSlice from "./userSlice.js";
import dataCNALSlice from "./dataCNAL.js";
import themeSlice from "./themeSlice.js";
import productSlice from "./productSlice.js";
import chineseUserSlice from "./chineseUserSlice.js";
import chineseSlice from "./chineseSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  dataCNAL: dataCNALSlice,
  product: productSlice,
  theme: themeSlice,
  chineseUser: chineseUserSlice,
  chinese: chineseSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);

export default store;
