import firebase from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyBTpmq6LQYMphycpwdwYbNi3iTUWxL2BJM",
    authDomain: "uber-5b7b9.firebaseapp.com",
    projectId: "uber-5b7b9",
    storageBucket: "uber-5b7b9.appspot.com",
    messagingSenderId: "402931339569",
    appId: "1:402931339569:web:9c4f7c966e1058d15ae010",
    
  };


  
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  export default firebase;