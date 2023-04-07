import { Children, createContext,useState } from "react";

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

    // set the value of context use the value prop available on the <Context.Provider value={value} />:
    return(<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}