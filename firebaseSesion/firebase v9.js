import firebase from 'firebase/compat/app'
import {
    getFirestore,
    collection,
    query,
    getDocs,
    setDoc,
    Timestamp,
    addDoc,
    doc,
} from "firebase/firestore";
import { getFirestore, collection, Timestamp, addDoc } from 'firebase/firestore/lite';
import {
    GithubAuthProvider,
    signInWithPopup,
    getAuth,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyD7sr300bp3tYJL3sr6exwnQEd8HAegQHQ',
    authDomain: 'devter-52b22.firebaseapp.com',
    projectId: 'devter-52b22',
    storageBucket: 'devter-52b22.appspot.com',
    messagingSenderId: '19472312709',
    appId: '1:19472312709:web:6ea745a287d4eaad8ebcec',
    measurementId: 'G-S5CRP2CJ9R'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
    const credential = GithubAuthProvider.credentialFromResult(user)
    // const token = credential.accessToken
    const { displayName, email, photoURL } = user

    return {
        avatar: photoURL,
        username: displayName,
        email
    }
}

export const listenAuthStateChanged = (onChange) => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            const normalizeUser = user ? mapUserFromFirebaseAuthToUser(user) : null
            onChange(normalizeUser)
        } else {
            return null
        }
    })
}

export const loginWithGitHub = () => {
    const provider = new GithubAuthProvider()
    const auth = getAuth()
    return signInWithPopup(auth, provider)
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const addDevit = ({ avatar, content, userId, userName }) => {
    return addDoc(collection(db, 'devits'), {
        avatar,
        content,
        userId,
        userName,
        createdAt: Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0,
    });
};

export const fetchLatestDevits = async () => {
    const q = query(collection(db, "devits"));
    const querySnap = await getDocs(q);
    const data = querySnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        // createdAt: Timestamp.fromDate(new Date()),
    }));
    console.log(data);
    return data;
};


// Get Additional info from the user

/*
export const loginWithGitHub = () => {
const auth = getAuth();
return signInWithPopup(auth, provider)
.then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const details = getAdditionalUserInfo(result)

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
} */