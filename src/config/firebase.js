import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getRemoteConfig, getValue, fetchAndActivate} from "firebase/remote-config";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator, ref } from "firebase/storage";

// Credenciales de proyecto firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Instancias de servicios
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const remoteConfig = getRemoteConfig();
const functions = getFunctions();
const storage = getStorage();

// Configuración emulador
if (location.hostname === 'localhost'){
  // Emulador firestore
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  // Emulador functions
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  // Emulador storage
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

// Con este recupero parametros en nube
remoteConfig.settings.minimumFetchIntervalMillis = 36000;

// Con este obtengo parametros de config
const isFetched = await fetchAndActivate(remoteConfig);
if(isFetched){
    let test = getValue(remoteConfig, "abc");
} else {
    let test = getValue(remoteConfig, "abc");
}

export {
  firebaseApp,
  db,
  functions,
  storage,
}

