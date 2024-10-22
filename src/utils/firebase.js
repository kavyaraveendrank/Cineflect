import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDPCEItmJ3uqaAnQb5FOo8k9bkcKogkRDA",
  authDomain: "cineflect-5e422.firebaseapp.com",
  projectId: "cineflect-5e422",
  storageBucket: "cineflect-5e422.appspot.com",
  messagingSenderId: "142624971814",
  appId: "1:142624971814:web:87b5e70e015fd0fc65dae7",
  measurementId: "G-91CRYQMK4Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();
