import { Outlet, Link } from "react-router-dom";
// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
// import { CartContext } from "../../contexts/cart-context";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoConatiner,
} from "./navigation.styles.jsx";
import "./navigation.styles.jsx";

// Navigation Component
const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // console.log(currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <NavigationContainer>
        <LogoConatiner to="/">
          <CrwnLogo className="logo">Logo</CrwnLogo>
        </LogoConatiner>

        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/sign-in">Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      {/* This will render the nested route here which we are nesting in App.js */}
      <Outlet />
    </>
  );
};

export default Navigation;
