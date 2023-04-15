import { Route,Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { onAuthStateChangedListener,createDocumentFromUserAuth } from "./utils/firebase/firebase.utils";
import {setCurrentUser}  from './store/user/user.action.js';
    


const App = () => {
const dispatch = useDispatch()

  useEffect(() => {
    // When firebase calls the callback in onAuthStateChanged, it passes the user parameter into that callback. That user parameter refers to a firebase user account
    const unsubscribe = onAuthStateChangedListener((user) => {
        console.log(user);
      if (user) {
         createDocumentFromUserAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
  
    return unsubscribe;
  }, []);
  

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        {/* index will tell that along with the parent element also render the Home component  in place where we have <Outlet in Navigation*/}
        {/* with path we say that after the / match the path what is given as and render that component in place where we have <Outlet in Navigation> */}
        <Route index element={<Home/>}></Route>
        <Route path='shop/*' element={<Shop/>}></Route>
        <Route path='sign-in' element={<Authentication/>}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
   
  );
};

export default App;