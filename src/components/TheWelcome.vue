<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import { prueba } from './composables/testFireStore'
import { listAllFiles, refFile  } from '../config/firebase'
import {  uploadBytes } from "firebase/storage";
import { ref, onMounted, watch } from 'vue'

const test = ref(prueba)
const selectedFile = ref(null);
const filePreviewUrl = ref(null);
const myFiles = ref([]);

const allFiles = ref([]);

const previewFile = (event) => {
    selectedFile.value = event.target.files[0];
    generatePreview();
}

watch(allFiles, async () => {
  const arr = await listAllFiles('imagenes');
  allFiles.value = JSON.parse(arr)['arrNames']
})

onMounted(async () => {
  const arr = await listAllFiles('imagenes');
  allFiles.value = JSON.parse(arr)['arrNames']
})

const onUpload = async () => {
    if (selectedFile.value) {
      const name = selectedFile.value['name']
      //GUARDAR EN STORAGE
      uploadBytes(refFile(`imagenes/${name}`), selectedFile.value).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });        
      // Agregar a localStorage
      //myFiles.value.push(selectedFile.value.name)
      const arr = await listAllFiles('imagenes');
      allFiles.value = JSON.parse(arr)['arrNames']

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
            <img src="../../public/favicon.ico" width="150" height="150">
            <label class="" for="upload">Drag and Drop Here</label>
            <input type="file" id="upload" name="upload" accept="application/pdf" @change="previewFile">
        </div>

        <div
          v-if="allFiles"
          v-for="file in allFiles"
        >
          <li>
            {{ file }}
          </li>

        </div>

    </div>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation {{ test }} </template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
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