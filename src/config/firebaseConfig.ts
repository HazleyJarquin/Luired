import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBK0UsI9s080O0Arg5Az1_W6925gTn9I4Y",
  authDomain: "luired-4266c.firebaseapp.com",
  projectId: "luired-4266c",
  storageBucket: "luired-4266c.appspot.com",
  messagingSenderId: "995506588899",
  appId: "1:995506588899:web:4e6bee8c25c6f3f32bc9d6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
