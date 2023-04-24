// we create our store and bring everything together
import { compose,applyMiddleware } from "redux";
// bcoz creatStore is deprecated
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reduce";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
  
    next(action);
  
    console.log('next state: ', store.getState());
  };

const middleWares = [loggerMiddleware];

const composedMiddleWares = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer,undefined ,composedMiddleWares);