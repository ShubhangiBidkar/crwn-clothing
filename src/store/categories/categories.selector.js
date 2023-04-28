import { createSelector } from 'reselect';

// This will give the slice of state which contains categories(array)
const selectCategoryReducer = (state) =>{ 
  // console.log(state.categories);
  return state.categories
} ;


export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) =>{ 
    // console.log(categoriesSlice.categories);
    return categoriesSlice.categories}
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  
);


export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);