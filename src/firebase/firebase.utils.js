import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyBAcNR938x-zixAdcbd-dmiRRnkZyDVCcM",
    authDomain: "crwn-db-8ddcd.firebaseapp.com",
    projectId: "crwn-db-8ddcd",
    storageBucket: "crwn-db-8ddcd.appspot.com",
    messagingSenderId: "970123832811",
    appId: "1:970123832811:web:99b62e83a4159447babdae",
    measurementId: "G-4JP9FHLQXQ"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase
  