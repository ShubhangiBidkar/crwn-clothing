import { createAction } from "../../utils/reducer/reducer.utils.jsx";
import { CATEGORIES_ACTION_TYPES } from "./categories.type.js";

export const setCategoriesMap = (categoriesMap) =>{
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP ,categoriesMap);
}