import { createAction } from "../../utils/reducer/reducer.utils.jsx";
import {CATEGORIES_ACTION_TYPES } from "./categories.type.js";

export const setCategories = (categoriesArray) =>{
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES ,categoriesArray);
}

