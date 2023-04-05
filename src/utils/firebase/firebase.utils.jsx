// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// This is required for Authentication
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
// This if for getting a document and settiong a document from fireStore database
import {doc,getFirestore,getDoc,setDoc} from 'firebase/firestore'
 

// Get this from the the firebase after you register your project using the web(<>)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHdkWOj8zScPwWlcdzNDeorc8TkhcdNE8",
  authDomain: "crwn-clothing-db-84588.firebaseapp.com",
  projectId: "crwn-clothing-db-84588",
  storageBucket: "crwn-clothing-db-84588.appspot.com",
  messagingSenderId: "1078630871805",
  appId: "1:1078630871805:web:c718366507f007c7240494"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create an instance of the Google provider object
const provider = new GoogleAuthProvider();

//  Specify additional custom OAuth provider parameters that you want to send with the OAuth request. To add a custom parameter, call setCustomParameters on the initialized provider with an object containing the key as specified by the OAuth provider documentation and the corresponding value
provider.setCustomParameters({
    promt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

// Get the database
export const db = getFirestore();

export const createDocumentFromUserAuth = async(userAuth) =>{
    const userDocRef = doc(db ,'users',userAuth.uid);
    // console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    // console.log(userSnapShot);
    // console.log(userSnapShot.exists());

    // if userSnapShot does not exists in the database then create on
    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef ,{
                displayName,
                email,
                createdAt,
            }

            )

        }catch(error){
            console.log('Error creating the user',error.message);
        }
    }
        return userDocRef;
}