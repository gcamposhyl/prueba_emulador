import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

import { getRemoteConfig, getValue, fetchAndActivate, fetchConfig, activate   } from "firebase/remote-config";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { getStorage, connectStorageEmulator, ref, listAll, getDownloadURL  } from "firebase/storage";


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
const functions = getFunctions();
const storage = getStorage();

// Con esto me conecto a emulador firestore
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
  let test = getValue(remoteConfig, "abc")
} else {
  let test = getValue(remoteConfig, "abc")
}

// Create a storage reference from our storage service
//const storageRef = ref(storage);
const imagesRef = ref(storage, 'imagenes');

//Ejemplo consumir function en emulador
const name = "Gabrielca"; // Cambia el nombre aquí
const url = `http://127.0.0.1:5001/gabriellab-876b3/us-central1/getAllFiles?name=${encodeURIComponent(name)}`;
const dataToSend = { key1: 'value1', key2: 'value2' }; // El objeto que deseas enviar

/*
await fetch(url, {
  method: 'POST', // Especificamos que la solicitud será de tipo POST
  headers: {
    'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
  },
  body: JSON.stringify(allObj), // Convertimos el objeto a formato JSON para enviarlo en el cuerpo
})
  .then(response => {
    if (!response.ok) {
      console.log("!!!!!!!!!!!!!!!")
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(dataObj => {
    console.log("!!!!!!!!!!!!!!!")
    console.log(dataObj); // Imprime "Hello, Gabrielca, from Firebase!" en la consola
  })
  .catch(error => {
    console.error('Error:', error);
  });
*/

//http://127.0.0.1:9199/v0/b/gabriellab-876b3.appspot.com/o/imagenes%2Flogo.svg?alt=media&token=f84cc949-4dea-4fa7-a021-376dc91dda6e
//http://127.0.0.1:9199/v0/b/gabriellab-876b3.appspot.com/o/imagenes%2Flogo.svg?alt=madia&token=f84cc949-4dea-4fa7-a021-376dc91dda6e
/*
listAll(imagesRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      console.log('Carpeta:', folderRef.name);
      // Puedes llamar listAll() recursivamente en folderRef para obtener archivos dentro de esta carpeta.
    });
    res.items.forEach((itemRef) => {
      //console.log('Nombre del archivo:', itemRef.name);
      // Obtener la URL de descarga de la imagen
      getDownloadURL(itemRef)
        .then((url) => {
          console.log('URL de la imagen:', url);
          // Aquí puedes usar la URL para mostrar la imagen en una etiqueta <img> o para otras operaciones
        })
        .catch((error) => {
          //console.error('Error al obtener la URL de la imagen:', error);
        });
    });
    
  })
  .catch((error) => {
    //console.log('Error al listar archivos:', error);
  });
*/
 

// Find all the prefixes and items.
let arr = await listAll(imagesRef)
  .then((res) => {
    return fetch(url, {
      method: 'POST', // Especificamos que la solicitud será de tipo POST
      headers: {
        'Content-Type': 'application/json', // Indicamos que el cuerpo de la solicitud es JSON
      },
      body: JSON.stringify(res), // Convertimos el objeto a formato JSON para enviarlo en el cuerpo
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



console.log(arr)  

console.log(JSON.parse(arr))

export {
  firebaseApp,
  db,
  functions,
  storage
}

