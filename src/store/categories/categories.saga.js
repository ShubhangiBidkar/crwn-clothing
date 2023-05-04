import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES } from "./categories.type.js";

export function* fetchCategoriesStartAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocument, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesStartAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
