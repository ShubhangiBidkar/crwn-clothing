// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// This is required for Authentication
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// This if for getting a document and settiong a document from fireStore database
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Get this from the the firebase after you register your project using the web(<>)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHdkWOj8zScPwWlcdzNDeorc8TkhcdNE8",
  authDomain: "crwn-clothing-db-84588.firebaseapp.com",
  projectId: "crwn-clothing-db-84588",
  storageBucket: "crwn-clothing-db-84588.appspot.com",
  messagingSenderId: "1078630871805",
  appId: "1:1078630871805:web:c718366507f007c7240494",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create an instance of the Google provider object,similarly we can have FaceBookProvider,github provider
const googleProvider = new GoogleAuthProvider();

//  Specify additional custom OAuth provider parameters that you want to send with the OAuth request. To add a custom parameter, call setCustomParameters on the initialized provider with an object containing the key as specified by the OAuth provider documentation and the corresponding value
googleProvider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
console.log(auth);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Get the database
export const db = getFirestore();

// Creates a new collection in firestore database
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// Retrievs the collection categories from the firestore database
export const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  // console.log(q);

  const querySnapShot = await getDocs(q);
  // console.log(querySnapShot);

  // const categoryMap =
  return querySnapShot.docs.map((doc) => doc.data());
};

// Crreates a document in firestore database
export const createDocumentFromUserAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapshot;
};

// This will create a user with email and password in firestore authentication
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// signOut the user
export const signOutUser = async () => {
  await signOut(auth);
};

// Observer pattern
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
