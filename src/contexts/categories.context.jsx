import { createContext,useState,useEffect } from "react";
import { addCollectionAndDocuments,getCategoriesAndDocument } from "../utils/firebase/firebase.utils";
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap:{}
});

export const CategoriesProvider =({children}) =>{

    const [categoriesMap,setcategoriesMap] = useState({});

    // Was used to store the SHOP_DATA in datbase which we require to do it just once
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA);
    // },[])

    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocument();
            console.log(categoryMap);
            setcategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[])

    const value ={categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}