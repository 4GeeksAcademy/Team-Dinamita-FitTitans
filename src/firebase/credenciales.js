// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyCKkeevQ5AIbJtBk-e2Dla1Yf4F9D65JsY",
    authDomain: "fit-titans-auth.firebaseapp.com",
    projectId: "fit-titans-auth",
    storageBucket: "fit-titans-auth.appspot.com",
    messagingSenderId: "376936928354",
    appId: "1:376936928354:web:b8cc2c1d0bdd90a0546d3b"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;