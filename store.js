import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appReducer from "./src/Redux/Reducer";
import rootSaga from "./src/Redux/RootSaga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["loaderReducer"],
  //   whitelist:[]
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
});
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
