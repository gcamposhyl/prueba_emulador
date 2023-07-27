
<script setup >
import { ref, reactive } from 'vue';

const selectedFile = ref(null);
const filePreviewUrl = ref(null);

const previewFile = (event) => {
    selectedFile.value = event.target.files[0];
    generatePreview();
}


const onUpload = () => {
    if (selectedFile.value) {
        // Access the file using selectedFile.value
        console.log("Selected file:", selectedFile.value);
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
            <p>Upload a File</p>
            <input type="file" accept="application/pdf" @change="previewFile">
        </div>
        <div v-if="filePreviewUrl">
            <p>File Preview:</p>
            <embed :src="filePreviewUrl" type="application/pdf" width="400" height="300"/>
        </div>
        <div>
            <button @click="onUpload">Upload</button>
        </div>
    </div>
    <div>
        <p>My files</p>
        <div></div>
    </div>
</template>


<style lang="css" scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 50px;
}

.content-input {
    gap: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

embed {
    border: 1px solid #ddd;
}
</style>