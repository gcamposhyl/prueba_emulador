import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

import { getRemoteConfig, getValue, fetchAndActivate, fetchConfig, activate   } from "firebase/remote-config";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

let firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig);

//const db = getFirestore(firebaseApp);
const db = getFirestore();
const remoteConfig = getRemoteConfig();

// Con este recupero parametros en nube
remoteConfig.settings.minimumFetchIntervalMillis = 36000;


// Con este obtengo parametros de config
const isFetched = await fetchAndActivate(remoteConfig);
if(isFetched){
    console.log("entro if")
    let test = getValue(remoteConfig, "abc")
    console.log(test)
} else {
    let test = getValue(remoteConfig, "abc")
    console.log("entro else")
    console.log(test)
}

// 3D695F20-3BBF-4E08-99BD-31A08217B659
// token_dep

//const appCheck = await initializeAppCheck(firebaseApp, {
  //  provider: new ReCaptchaV3Provider('contrasena'),
  
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    //isTokenAutoRefreshEnabled: true
 //});

// Con esto me conecto a emulador firestore
if (location.hostname === 'localhost'){
    console.log("aqui necesito detectar que quiero cambiar a emulador!!!!!!!!!!!!")
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

export {
    firebaseApp,
    db,

}

