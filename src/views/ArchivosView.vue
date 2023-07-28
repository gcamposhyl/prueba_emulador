<script setup>
import UploadView from './UploadView.vue';

const FilesLocalStorage = JSON.parse(localStorage.getItem('myFiles')) ?? []
//console.log(FilesLocalStorage)
</script>

<template>
    <div>
        <h1 class="my-files-title">Subir Archivo</h1>
        <UploadView />
    </div>
    <h1 class="my-files-title"> </h1>
    <div class="content-files">
        
        <div v-for="file in FilesLocalStorage" class="my-files">
            <div class="my-file">
                <img src="../../public/img/pdfIcon.png" width="60" height="60">
                <p>{{  }}</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.my-files-title {
    font-size: 22px;
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