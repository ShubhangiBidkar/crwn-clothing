import { Outlet ,Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

// Navigation Component
const Navigation = () =>{

    const {currentUser,setCurrentUser} =useContext(UserContext);
    console.log(currentUser);
  


    return(
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className='logo' >Logo</CrwnLogo>
                </Link>
                
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>Shop</Link>
                    {currentUser ?
                        (<span className="nav-link" onClick={signOutUser}>Sign Out</span>):  
                        (<Link className="nav-link" to='/sign-in'>Sign In</Link>) 
                     }
        
                </div>
            </div>
            {/* This will render the nested route here which we are nesting in App.js */}
            <Outlet/>
            
        </>
    );
}


export default Navigation;