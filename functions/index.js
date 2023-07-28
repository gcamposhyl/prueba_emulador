// Dependencias de functions
const { async } = require("@firebase/util");
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

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
        const res = request.body; // Obtener el objeto enviado en el cuerpo de la solicitud
        
        const functionsEmulatorURL = 'http://127.0.0.1:9199/v0/b/';
        const bucketName = 'gabriellab-876b3.appspot.com';

        let arrUrl = [];
        let arrNames = [];

        res.items.forEach(async(itemRef) => {
            // Obtener la ruta del archivo (ubicación en el bucket)
            const fileName = itemRef["_location"]['path_'].replace(/\s/g, '%20');
            
            console.log("nombre: " + fileName)
            const cleanedFileName = fileName.replace('imagenes/', '');

            // Construir la URL de descarga utilizando el emulador de Firebase Storage
            const downloadURL = `${functionsEmulatorURL}${bucketName}/o/imagenes%2F${cleanedFileName}`;

            // Lleno arreglos
            arrUrl.push(downloadURL);
            arrNames.push(fileName)

          });
        
        functions.logger.info("getAllFiles logs!", { structuredData: true });
        response.send(`${JSON.stringify({arrUrl, arrNames})}`);
    });
  });

// Funcion que consulta todos los elementos en el directorio de un bucket, retorna arreglo con objetos
exports.getTokenFile = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
      console.log(request)
    
      functions.logger.info("SetnewFile logs!", { structuredData: true });
      //response.send(`${JSON.stringify(res)}`);
      response.send(`${JSON.stringify()}`);
  });
});


// Funcion para guardar imagen, retorna url de imagen guardada
// Funcion que consulte documento espefico y retorne url 
// Funcion que elimine todos los archivos de la carpeta
// Fuuncion que elimine archivo por id

// Functions fireStore
exports.setCol = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
      const res = request.body; // Obtener el objeto enviado en el cuerpo de la solicitud
      
      

      console.log("!!!!!!!!!!!!!!!")
      console.log(res)
      functions.logger.info("getAllFiles logs!", { structuredData: true });
      response.send(`${JSON.stringify({res})}`);
  });
});
// Crear objeto con nuevos datos, void
// Actualizar parte de un objeto, retorna objeto actualizado
// Eliminar Objeto completo, retorna objeto eliminado
// Listar todos los objetos, retorna arreglo con objetos
// Listar objeto particular segun id, retorna objeto
// * Consultar objeto segun dos condiciones


