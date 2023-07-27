import { ref, reactive, onMounted, computed } from 'vue'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { defineStore } from 'pinia'
import { useFirebaseAuth} from 'vuefire'
import {useRouter} from 'vue-router'



export const usersStore = defineStore('users', () => {

    const authFire = useFirebaseAuth()

    const router = useRouter()
    const userLogin = ref(null)
    const user = reactive({
        email: '',
        password: ''
    })

    const errorMsg = ref('')
    const errorCodes = {
        'auth/user-not-found' : 'Usuario no encontrado',
        'auth/wrong-password' : 'El password es incorrecto'
    }

    onMounted(() => {
        onAuthStateChanged(authFire, (user) => {
            console.log("Estado de usuario logiado");
            userLogin.value = user
            console.log(userLogin.value);

        })
    })

    //Iniciar sesion con login 
    function loginUser() {

        signInWithEmailAndPassword(authFire, user.email, user.password)
            .then( (userCredential) => {
                const user = userCredential.user
                console.log(user);
                router.push({name: 'tus-archivos'})
                
            })
            .catch(error => {
                console.log(error)
                
            })
    }

    //Cerrar sesion
    const logout = () => {
        signOut(authFire)
            .then(() => {
                userLogin.value = null
                router.push({name:'inicio'})
            })
            .catch(() => {
                console.log(error);
            })
    }

    //Registro de usuario mediante google 

    const iniciarSesionConGoogle = () => {
        const provider = new GoogleAuthProvider();
        console.log(provider);
        signInWithPopup(authFire, provider) 
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                router.push({name: 'tus-archivos'})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })
    }


    return {
        user,
        userLogin,
        loginUser,
        logout,
        iniciarSesionConGoogle
    }

})


