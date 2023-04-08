import { Outlet ,Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart-context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';

// Navigation Component
const Navigation = () =>{

    const {currentUser} =useContext(UserContext);
    const {isCartOpen} =useContext(CartContext);
    // console.log(currentUser);
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
                     <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}            
            </div>
            {/* This will render the nested route here which we are nesting in App.js */}
            <Outlet/>
            
        </>
    );
}


export default Navigation;