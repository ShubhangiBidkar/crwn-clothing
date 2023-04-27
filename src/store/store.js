// we create our store and bring everything together
import { compose,applyMiddleware } from "redux";
// bcoz creatStore is deprecated
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reduce";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";


const middleWares = [process.env.NODE_ENV === 'development' && logger,thunk,].filter(
  Boolean
);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


const  persistConfig ={
  key:'root',
  storage,
  blacklist:['user']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

// const middleWares = [logger];
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// const composedMiddleWares = compose(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer,undefined ,composedMiddleWares);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
export const persistor = persistStore(store);