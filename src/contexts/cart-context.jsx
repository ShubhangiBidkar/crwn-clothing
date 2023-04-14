
import { createContext ,useEffect,useReducer,useState} from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems,productToAdd) =>{
    // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => (
       cartItem.id === productToAdd.id
      ))
    
    //If found increment the quantity 
    if(existingCartItem){
        return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id 
        ? {...cartItem,quantity:cartItem.quantity +1}
        :cartItem)
    }
    // return new array with modified cartItems/new CartItems
    return [...cartItems ,{...productToAdd, quantity:1}] 
}


const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext =createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems :[],
    addItemToCart: ()=>{},
    cartItemCount:0,
    removeItemFromCart : () =>{},
    clearItemFromCart: () => {},
    cartTotal: 0,
})
// Cart Action Tpes
const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

// Intial state only stores readable values
const INITIAL_STATE = {
  isCartOpen:false,
  cartItems :[],
  cartItemCount:0,
  cartTotal: 0,
}

// Reducer
const cartReducer = (state,action) =>{
  const {type,payload} = action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return{
        ...state,
        ...payload,
      };
      
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return{
        ...state,
        isCartOpen :payload,
      };
    default:
      throw new Error(`Unhadles error of type ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) =>{
   const [{isCartOpen,cartItems ,cartItemCount,cartTotal },dispatch] =useReducer(cartReducer,INITIAL_STATE);

// Update reducer
  const updateCartItemsReducer = (newCartItems)=>{

    // Generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // Generate newCartTotal
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload ={cartItems:newCartItems,
                    cartTotal:newCartTotal,
                    cartItemCount:newCartCount}
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,payload));

}

    const addItemToCart =(productToAdd) =>{
        // setCartItems(addCartItem(cartItems,productToAdd));
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart =(cartItemToRemove) =>{
        // setCartItems(removeCartItem(cartItems,cartItemToRemove));
      const newCartItems = removeCartItem(cartItems,cartItemToRemove);
      updateCartItemsReducer(newCartItems);
    }

    
    const clearItemFromCart = (cartItemToClear) => {
        // setCartItems(clearCartItem(cartItems, cartItemToClear));
        const newCartItems =clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems);
      };

    const setIsCartOpen =(bool) =>{
      dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool))
    }  

    const value={isCartOpen,
                  setIsCartOpen,
                  addItemToCart,
                  cartItems,
                  cartItemCount,
                  removeItemFromCart,
                  cartTotal,
                  clearItemFromCart}


    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

