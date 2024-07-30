import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA5EwzCUhOZbeRZ4aWv9cnrSzO0MZYjo1s",
    authDomain: "melodyai-e8496.firebaseapp.com",
    projectId: "melodyai-e8496",
    storageBucket: "melodyai-e8496.appspot.com",
    messagingSenderId: "735225631853",
    appId: "1:735225631853:web:5d0d2b937ba020282cdb64",
    measurementId: "G-1EB0EM7V13"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };