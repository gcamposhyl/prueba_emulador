import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

import { getRemoteConfig, getValue, fetchAndActivate} from "firebase/remote-config";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator, ref, listAll } from "firebase/storage";

let firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const remoteConfig = getRemoteConfig();
const functions = getFunctions();
const storage = getStorage();

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

function refFile(path){
  return ref(storage, path);
}

// Con este obtengo parametros de config
const isFetched = await fetchAndActivate(remoteConfig);
if(isFetched){
    
    let test = getValue(remoteConfig, "abc")
    //console.log(test)
} else {
    let test = getValue(remoteConfig, "abc")
    
    //console.log(test)
}

//Funciones
const url = `http://127.0.0.1:5001/gabriellab-876b3/us-central1/getAllFiles`;
function listAllFiles (path){
  return listAll(refFile(path))
  .then((res) => {
    return fetch(url, {
      method: 'POST', // Especificamos que la solicitud será de tipo POST
      headers: {
        'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
      },
      body: JSON.stringify(res), 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        //console.log(data); 
        return data;
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  })
  .catch((error) => {
    console.log('Error al listar archivos:', error);
  }); 
}

async function getTokenFile(jsonUrl) {
  try {
    // Obtener la respuesta de la URL
    const response = await fetch(jsonUrl);

    // Extraer los datos del JSON
    const jsonData = await response.json();

    // Guardar los datos en una variable
    const variableGuardada = jsonData;

    // Hacer lo que necesites con la variableGuardada
    //console.log(variableGuardada);

    const token = variableGuardada['downloadTokens']

    //console.log(token)

    return token;

  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

export {
  firebaseApp,
  db,
  functions,
  storage,
  refFile,
  listAllFiles
}

