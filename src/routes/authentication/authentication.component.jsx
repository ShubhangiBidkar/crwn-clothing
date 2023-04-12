import { useEffect } from "react";
import {getRedirectResult} from 'firebase/auth'

import SignUpForm from "../../components/sign-up-form/sign-up-form.component"; 
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import {AuthenticationContainer} from './authentication.styles'


const Authentication =() =>{

    //   creates a user in firease db when user users google signin redirect
    // useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await getRedirectResult(auth);
    //       if (response) {
    //         const userDocRef = await createDocumentFromUserAuth(response.user);
    //         console.log('signInWithRedirect', userDocRef);
    //       }
    //     };
       
    //     fetchData().catch(console.error);
    //   }, []);


    


    return(
        <AuthenticationContainer>
            
            <SignInForm/>
            {/* <button onClick ={logGoogleUser}>Sign in with Google Popup</button> */}
            {/* <button onClick ={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </AuthenticationContainer>
    );
}

export default Authentication;