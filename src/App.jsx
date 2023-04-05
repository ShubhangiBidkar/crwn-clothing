import { Route,Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

const Shop = () =>{
  return(
    <div>
      <h1>I m inside Shopping</h1>
    </div>
  );
}


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        {/* index will tell that along with the parent element also render the Home component  in place where we have <Outlet in Navigation*/}
        {/* with path we say that after the / match the path what is given as and render that component in place where we have <Outlet in Navigation> */}
        <Route index element={<Home/>}></Route>
        <Route path='shop' element={<Shop/>}></Route>
        <Route path='sign-in' element={<SignIn/>}></Route>
      </Route>
    </Routes>
   
  );
};

export default App;