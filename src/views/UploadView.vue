
<script setup >
import { ref, onMounted, watch } from 'vue';

const selectedFile = ref(null);
const filePreviewUrl = ref(null);
const myFiles = ref([])

onMounted(() => {
        myFiles.value = JSON.parse(localStorage.getItem('myFiles')) ?? []
    })

watch(myFiles, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

function sincronizarLocalStorage() {
    localStorage.setItem('myFiles', JSON.stringify(myFiles.value))
}

const previewFile = (event) => {
    selectedFile.value = event.target.files[0];
    generatePreview();
}


const onUpload = () => {
    if (selectedFile.value) {
        // Access the file using selectedFile.value
        console.log("Selected file:", selectedFile.value);
        
        // Agregar a localStorage
        myFiles.value.push(selectedFile.value.name)
    } else {
        console.log("No file selected");
    }
}

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
</style>