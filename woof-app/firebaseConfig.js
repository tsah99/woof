  // @refresh restart
  
  import * as firebase from "firebase";
  import "firebase/firestore";
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDUMgKQhDiHyxjbvFdT57AbjUWFlLhyVcU",
    authDomain: "woof-48adb.firebaseapp.com",
    projectId: "woof-48adb",
    storageBucket: "woof-48adb.appspot.com",
    messagingSenderId: "554573390090",
    appId: "1:554573390090:web:a52f636c14ab6a25951af3",
    measurementId: "G-XMP7G15BF8"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);

  export const DogRef = db.collection("dogs");

  export { firebase };