// Dependencias de functions
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

// Functions storage
exports.getAllFiles = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const res = request.body; // Obtener el objeto enviado en el cuerpo de la solicitud        
        let obj = {};

        res.items.forEach(async(itemRef, count) => {
            //ej: 'http://127.0.0.1:9199/v0/b/';
            const service = itemRef["_service"];
            const functionsEmulatorURL = `${service['_protocol']}://${service['_host']}/v0/b/`;
            //ej: gabriellab-876b3.appspot.com';
            const bucketName = itemRef["_location"]['bucket'];
            // Obtener la ruta del archivo (ubicación en el bucket)
            const fileName = itemRef["_location"]['path_'].replace(/\s/g, '%20');
            const cleanedFileName = fileName.replace('imagenes/', '');
            // Construir la URL de descarga utilizando el emulador de Firebase Storage
            const downloadURL = `${functionsEmulatorURL}${bucketName}/o/imagenes%2F${cleanedFileName}`;

            obj[count] = {
              downloadURL,
              fileName
            }
          });
        
        functions.logger.info("getAllFiles logs!", { structuredData: true });
        response.send(`${JSON.stringify(obj)}`);
    });
  });