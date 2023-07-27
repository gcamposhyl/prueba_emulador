<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import {onMounted, ref} from 'vue'
  import {remoteConfig} from '../stores/remote_config'

  const remote = remoteConfig()
  const empresa = ref("")
  const descripcion = ref("")
  // const nombreEmpresa = config.nombreEmpresa
  // console.log(nombreEmpresa);

  onMounted(() => {
    remote.getConfig()
    empresa.value = remote.nombreEmpresa
    descripcion.value = remote.descripcion
  })



</script>

<template>
  <!-- Navegacion -->
  
   <div class="informacion">
    <h1>{{empresa}}</h1>
      <p>
        {{descripcion}}
      </p>
   </div>
  <!-- <div>
    <RouterLink />
  </div> -->


</template>

<style>
  .informacion {
    text-align: center;
  }
</style>

