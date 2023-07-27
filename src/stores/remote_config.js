import {getRemoteConfig} from 'firebase/remote-config'
import { useFirebaseAuth} from 'vuefire'
import { defineStore } from 'pinia'
import { getValue, fetchAndActivate  } from "firebase/remote-config";
import {ref} from 'vue'


export const remoteConfig = defineStore('remote', () => {
    const nombreEmpresa = ref('')
    const descripcion = ref('')

    const getConfig = async () => {

        const remoteConfig = getRemoteConfig();

        // // Con este recupero parametros en nube
        remoteConfig.settings.minimumFetchIntervalMillis = 36000;

        // Valor por defecto
        remoteConfig.defaultConfig = {
            "nombre_empresa": "Nombre empresa!!!"
        };

        const val = getValue(remoteConfig, "nombre_empresa");
        nombreEmpresa.value = val._value

        const val_descripcion = getValue(remoteConfig, "descripcion");
        descripcion.value = val_descripcion._value

    }
        


    return {
        getConfig,
        nombreEmpresa,
        descripcion
    }

})





