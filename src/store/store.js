// we create our store and bring everything together
import { compose,applyMiddleware } from "redux";
// bcoz creatStore is deprecated
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reduce";

const middleWares = [logger];

const composedMiddleWares = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer,undefined ,composedMiddleWares);