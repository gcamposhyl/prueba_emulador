import { listAll, ref } from "firebase/storage";
import { storage } from "../../config/firebase";

//Funcion de utilidad para referenciar archivos en storage
function refFile(path){
    return ref(storage, path);
  }

//Lista archivos en storage
function listAllFiles (path){
    const url = `http://127.0.0.1:5001/gabriellab-876b3/us-central1/getAllFiles`;
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

//Obtengo token de archivo ubicado en storage
async function getTokenFile(jsonUrl) {
    try {
      // Obtener la respuesta de la URL
      const response = await fetch(jsonUrl);
  
      // Extraer los datos del JSON
      const jsonData = await response.json();
  
      // Guardar los datos en una variable
      const variableGuardada = jsonData;
  
      const token = variableGuardada['downloadTokens']
  
      return token;
  
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

    
export {
    listAllFiles,
    getTokenFile,
    refFile
}