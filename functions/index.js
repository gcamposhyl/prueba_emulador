// Dependencias de functions
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

//import { db, storage} from '../src/config/firebase'
//import { ref, listAll, getDownloadURL  } from "firebase/storage";

// Function de prueba
exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
      const name = request.query.name || 'Anonymous'; // Obtener el parámetro "name" de la consulta
      const data = request.body; // Obtener el objeto enviado en el cuerpo de la solicitud
           
      functions.logger.info("Hello logs!", { structuredData: true });
      response.send(`Hello, ${name}, from Firebase!, obj: ${JSON.stringify(data['storage'])}`);
    });
  });
  


// Functions storage

// Funcion que consulta todos los elementos en el directorio de un bucket, retorna arreglo con objetos
/*exports.getAllFiles = functions.https.onRequest((request, response) => {
    cors(request, request, () => {
        const storageRef = ref(storage);
        const imagesRef = ref(storage, 'imagenes');
    })
})*/


// Funcion para guardar imagen, retorna url de imagen guardada
// Funcion que consulte documento espefico y retorne url 
// Funcion que elimine todos los archivos de la carpeta
// Fuuncion que elimine archivo por id

// Functions fireStore

// Crear objeto con nuevos datos, void
// Actualizar parte de un objeto, retorna objeto actualizado
// Eliminar Objeto completo, retorna objeto eliminado
// Listar todos los objetos, retorna arreglo con objetos
// Listar objeto particular segun id, retorna objeto
// * Consultar objeto segun dos condiciones


