// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const FirebaseApp = initializeApp({
	apiKey: process.env.FIREB_APIKEY,
	authDomain: process.env.FIREB_AUTHDOMAIN,
	projectId: process.env.FIREB_PROJECTID,
	storageBucket: process.env.FIREB_STORAGEBUCKET,
	messagingSenderId: process.env.FIREB_MESSAGINGSENDERID,
	appId: process.env.FIREB_APPID,
});
