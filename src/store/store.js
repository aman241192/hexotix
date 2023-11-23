import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../slice/registrationSlice";
import userReducer from "../slice/userSlice";
import managementReducer from "../slice/managementSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  registration: registrationReducer,
  management: managementReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
});

export const persistor = persistStore(store);
