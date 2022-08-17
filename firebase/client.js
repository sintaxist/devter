import firebase from 'firebase/compat/app'
import {  GithubAuthProvider, signInWithPopup, getAuth, getAdditionalUserInfo, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7sr300bp3tYJL3sr6exwnQEd8HAegQHQ",
    authDomain: "devter-52b22.firebaseapp.com",
    projectId: "devter-52b22",
    storageBucket: "devter-52b22.appspot.com",
    messagingSenderId: "19472312709",
    appId: "1:19472312709:web:6ea745a287d4eaad8ebcec",
    measurementId: "G-S5CRP2CJ9R"
};

firebase.initializeApp(firebaseConfig);

const provider = new GithubAuthProvider();

export const listenAuthStateChanged = (onChange) => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
        if(user){
            console.log('login')
        }
    })
}

export const loginWithGitHub = () => {
    const auth = getAuth();
    return signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const details = getAdditionalUserInfo(result)
        const token = credential.accessToken;
        const user = result.user;

        const {username, profile} = details
        const {avatar_url, blog} = profile

        return{
            avatar: avatar_url,
            username,
            url: blog
        }

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
    });
}