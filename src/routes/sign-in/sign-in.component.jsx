import { useEffect } from "react";
import {getRedirectResult} from 'firebase/auth'
import { auth,
        signInWithGooglePopup,
        signInWithGoogleRedirect,
        createDocumentFromUserAuth,
        createAuthUserWithEmailAndPassword  } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"; 



const SignIn =() =>{

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


    //   creates a user in firease db when user users google signin popup
    const logGoogleUser = async() =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createDocumentFromUserAuth(user);
    }


    return(
        <div>
            <h1>Sign In</h1>
            <button onClick ={logGoogleUser}>Sign in with Google Popup</button>
            {/* <button onClick ={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    );
}

export default SignIn;