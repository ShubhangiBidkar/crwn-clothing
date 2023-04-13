import { Children, createContext,useState,useEffect,useReducer } from "react";
import { onAuthStateChangedListener,createDocumentFromUserAuth } from "../utils/firebase/firebase.utils";

// Using the context in React requires 3 simple steps: creating the context, providing the context, and consuming the context.


// creating the context,
// Actual value want to access
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>null
}); 


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  
  const { type, payload } = action;
 
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

//  providing the context
export const UserProvider = ({children})=>{
  // const[currentUser,setCurrentUser] =useState(null);
  // {currentUser} is the state which is set to the iINITIAL_STATE
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);

  const setCurrentUser = (user) =>
  // when dispatch is called the userReducer() gets its action 
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user });

  const value = {currentUser,setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // console.log(user);
          if (user) {
            createDocumentFromUserAuth(user);
          }
          setCurrentUser(user);
        });
    
        return unsubscribe;
      }, []);

    // set the value of context use the value prop available on the <Context.Provider value={value} />:
    return(<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}