import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categories.saga";

// export generator function
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}