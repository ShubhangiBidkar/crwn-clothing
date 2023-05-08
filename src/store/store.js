// we create our store and bring everything together
import { compose, applyMiddleware } from "redux";
// bcoz creatStore is deprecated
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reduce";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Persist is used to persisrt the reducers in local storage

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// Persist configuration object
const persistConfig = {
  //key is the part that we want to start with and Root just says, I want you to persist the whole
  // thing
  key: "root",
  // what do we want to store this into?
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedMiddleWares = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedMiddleWares
);

export const persistor = persistStore(store);
