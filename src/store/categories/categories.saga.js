import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES } from "./categories.type.js";

export function* fetchCategoriesStartAsync() {
  console.warn("Inside fetchCategoriesStartAsync in saga ");
  try {
    const categoriesArray = yield call(getCategoriesAndDocument, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
    console.warn("Inside fetchCategoriesStartAsync in saga after put ");
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchCategories() {
  console.warn("Inside onFetchCategories in saga ");
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesStartAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
