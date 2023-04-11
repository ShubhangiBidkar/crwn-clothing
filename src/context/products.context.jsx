import { createContext,useState,useEffect } from "react";
import { addCollectionAndDocuments,getCategoriesAndDocument } from "../utils/firebase/firebase.utils";
// import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
    products:[]
});

export const ProductsProvider =({children}) =>{

    const [products,setProducts] = useState([]);

    // Was used to store the SHOP_DATA in datbase which we require to do it just once
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA);
    // },[])

    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocument();
            console.log(categoryMap);
        }
        getCategoriesMap();
    },[])

    const value ={products};
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}