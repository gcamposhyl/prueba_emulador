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
exports.getAllFiles = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const name = request.query.name || 'Anonymous'; // Obtener el parámetro "name" de la consulta
        const res = request.body; // Obtener el objeto enviado en el cuerpo de la solicitud
        
        const functionsEmulatorURL = 'http://127.0.0.1:9199/v0/b/';
        const bucketName = 'gabriellab-876b3.appspot.com';

        let arrUrl = [];

        res.items.forEach((itemRef) => {
            //console.log('Nombre del archivo:', itemRef.name);
            console.log(Object.keys(itemRef))
            console.log(itemRef["_location"]['path_'])
            // Obtener la ruta del archivo (ubicación en el bucket)
            const fileName = itemRef["_location"]['path_'];
            const cleanedFileName = fileName.replace('imagenes/', '');
            const tokenFile = "1"

            // Construir la URL de descarga utilizando el emulador de Firebase Storage
            //const downloadURL = `${functionsEmulatorURL}${bucketName}/o/imagenes%2F${cleanedFileName}?alt=madia&token=${tokenFile}`;
            const downloadURL = `${functionsEmulatorURL}${bucketName}/o/imagenes%2F${cleanedFileName}`;
            console.log('URL de la imagen:', downloadURL);
            arrUrl.push(downloadURL)
      
            // Aquí puedes usar la downloadURL para mostrar la imagen en una etiqueta <img> o para otras operaciones
          });
        
        
        functions.logger.info("Hello logs!", { structuredData: true });
        //response.send(`${JSON.stringify(res)}`);
        response.send(arrUrl);
    });
  });
// Funcion que consulta todos los elementos en el directorio de un bucket, retorna arreglo con objetos



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


