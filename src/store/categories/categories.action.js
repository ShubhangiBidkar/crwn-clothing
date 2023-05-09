import { createAction } from "../../utils/reducer/reducer.utils.jsx";
import { CATEGORIES_ACTION_TYPES } from "./categories.type.js";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";

// Action creater  and calls the reducer
// export const setCategories = (categoriesArray) =>{
//     return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES ,categoriesArray);
// }

export const fetchCategoriesStart = () => {
  console.warn("Inside fetchCategoriesStart in action ");
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
};
export const fetchCategoriesSuccess = (categoriesArray) => {
  console.warn("Inside fetchCategoriesSuccess in action ");
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
};

export const fetchCategoriesFailure = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

//   thunk
// export const fetchCategoriesStartAsync = () => {
//   return async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//       const categoriesArray = await getCategoriesAndDocument('categories');
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailure(error));
//     }
//   };
// };
