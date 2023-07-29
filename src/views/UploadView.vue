<script setup >
import { ref, onMounted} from 'vue';
import { db } from '../config/firebase'
import { listAllFiles, getTokenFile, refFile } from '../components/composables/useStorage'
import { doc, setDoc, getDoc  } from 'firebase/firestore'
import {  uploadBytes } from "firebase/storage";

const selectedFile = ref(null);
const filePreviewUrl = ref(null);
const allFiles = ref([]);

onMounted(async () => {
    const docRef = doc(db, "pdfFiles", "referencias");
    const docSnap = await getDoc(docRef);
    allFiles.value = docSnap.data();
})

const previewFile = (event) => {
    selectedFile.value = event.target.files[0];
    generatePreview();
}

const onUpload = async () => {
  if (selectedFile.value) {
    const name = selectedFile.value['name'];
    //Guardar en storage
    uploadBytes(refFile(`imagenes/${name}`), selectedFile.value)
        .then(async () => {
            const obj = await listAllFiles('imagenes');
            let parsedObj = JSON.parse(obj);

            for (const key of Object.keys(parsedObj)) {
                let nameFile = parsedObj[key]['fileName'];
                let shortUrl = parsedObj[key]['downloadURL'];
                let token = await getTokenFile(shortUrl);
                let wholeUrl = `${shortUrl}?alt=media&token=${token}`;

                parsedObj[key] = {
                nameFile,
                wholeUrl
                };
            }
            // Guardo en firestore
            await setDoc(doc(db, "pdfFiles", "referencias"), parsedObj);
            allFiles.value = parsedObj;
            });
  } 
};

//Abre archivo en navegador
const openFile = function (url) {
    window.open(url, '_blank');
}

//Genera previsualkización del archivo
const generatePreview = function () {
    if (selectedFile.value) {
        const reader = new FileReader();

        reader.onload = () => {
            filePreviewUrl.value = reader.result; // Set the file preview URL
        };

        // Read the file as a data URL (base64 encoded)
        reader.readAsDataURL(selectedFile.value);
    }
};

</script>

<template>
    <div class="content">
        <div class="content-input">
            <label for="upload">Select a File</label>
            <input type="file" id="upload" name="upload" accept="application/pdf" @change="previewFile">
        </div>
        <div v-if="filePreviewUrl" class="preview-file">
            <embed :src="filePreviewUrl" type="application/pdf" width="600" height="400" />
            <div class="content-button">
                <button @click="onUpload">Upload</button>
            </div>
        </div>
        <div v-else class="not-preview-file">
            <img src="../../public/img/subir.png" width="150" height="150">
            <label class="" for="upload">Drag and Drop Here</label>
            <input type="file" id="upload" name="upload" accept="application/pdf" @change="previewFile">
        </div>
    </div>

    <div
    v-if="allFiles"
    >
        <h1 class="my-files-title">Tus archivos</h1>
        <div class="content-files">
            
            <div 
            
            v-for="file in allFiles" class="my-files"
            >
                <div class="my-file">
                    <img 
                        src="../../public/img/pdfIcon.png" 
                        width="60" 
                        height="60"
                        @click="openFile(file['wholeUrl'])"
                        style="cursor: pointer;"
                    >
                    <p 
                        class="descargar-archivo" 
                        @click="openFile(file['wholeUrl'])"
                    >{{ file['nameFile'].replace(/%20/g, ' ').replace(/imagenes\//g, '').slice(0,20) + "..."  }}</p>
                </div>

            </div>
        </div>
    </div>
    <h1
        class="not-files-title"
        v-else
    >Sin archivos</h1>
</template>


<style lang="css" scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 20px;
}

.content-input {
    position: relative;
    display: flex;
    width: 260px;
    background-color: #105272;
    border-radius: 30px;
    color: #fff;
    padding: 10px;
    justify-content: center;
    align-items: center;

}

.not-preview-file {
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    border: 3px solid #575757;
    border-radius: 10px;
    background-color: rgb(231, 240, 248);
    border-style: dashed;
}
.not-preview-file input {
    opacity: 0;
    width: 600px;
    height: 400px;
}
.preview-file {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    appearance: none;
    position: absolute;
    opacity: 0;
    width: max-content;
}

.content-button {
    background-color: #105272;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    padding: 10px;
    border-radius: 20px;
}

.content-button:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-out;
}

button {
    all: unset
}

embed {
    border: 1px solid #ddd;
    border-radius: 10px;
}





.not-files-title {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  height: 100px; /* Ajusta la altura según tus necesidades */
  width: 100%; /* Ajusta el ancho según tus necesidades */
  /* Otros estilos opcionales para el contenedor */
  border: 1px solid #ccc;
  background-color: #f7f7f7;
}
.descargar-archivo{
cursor:pointer
}

.my-files-title {
    font-size: 22px;
    display: flex;
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente */
    height: 100px; /* Ajusta la altura según tus necesidades */
    width: 100%; /* Ajusta el ancho según tus necesidades */
    /* Otros estilos opcionales para el contenedor */
    border: 1px solid #ccc;
    background-color: #f7f7f7;
}

.content-files{
    display: flex;
    flex-direction: row;
    justify-content: start;
}

.my-file {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 150px;
}

.my-files {
    display: flex;
    width: 190px;
    height: 120px;
    border: solid 2px;
    border-radius: 20px;
    margin: 20px;
    background-color: rgb(255, 250, 235);
    flex-direction: row;
    font-size: 10px;
    justify-content: center;
    align-items: center;
}
</style>