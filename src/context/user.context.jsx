import { Children, createContext,useState,useEffect } from "react";
import { onAuthStateChangedListener,createDocumentFromUserAuth } from "../utils/firebase/firebase.utils";

// Using the context in React requires 3 simple steps: creating the context, providing the context, and consuming the context.


// creating the context,
// Actual value want to access
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>null
}); 

//  providing the context
export const UserProvider = ({children})=>{
    const[currentUser,setCurrentUser] =useState(null);
    const value = {currentUser,setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
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