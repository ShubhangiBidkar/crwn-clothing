import { Outlet ,Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () =>{
    return(
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className='logo' >Logo</CrwnLogo>
                </Link>
                
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>Shop</Link>
                        
                    <Link className="nav-link" to='/sign-in'>Sign In</Link>
                </div>
            </div>
            {/* This will render the nested route here which we are nesting in App.js */}
            <Outlet/>
            
        </>
    );
}


export default Navigation;