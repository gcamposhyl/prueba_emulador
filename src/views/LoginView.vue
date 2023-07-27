<script setup>
    import {usersStore} from '../stores/auth'
    import {ref, onMounted, watch} from 'vue'

    const users = usersStore()
  
    const handleSubmit = () => {
        users.loginUser()
        
    }

    


</script>

<template>
    
        <div class="body">
            <div>
                <div 
                    class="alert"
                        v-if="users.errorMsg"
                    >
                    <p>{{ users.errorMsg}}</p>
                </div>
                <form action="/login" method="post"
                @submit.prevent="handleSubmit"
                >
                <h2>Iniciar sesión</h2>
                <label for="email">Correo electrónico:</label><br>
                <input 
                type="email" 
                id="email" 
                name="email"  
                required
                v-model="users.user.email"
                >
                
                <br><br>
                
                <label for="password">Contraseña:</label><br>
                <input 
                type="password" 
                    id="password" 
                    name="password" 
                    required
                    v-model="users.user.password"
                    ><br><br>
                    
                    <input 
                    type="submit" 
                    value="Iniciar sesión"
                    >
                </form>
                
                <p  class="google_session"
                    @click="users.iniciarSesionConGoogle"
                    >
                    Iniciar sesion con Google
                </p>
                <p  class="google_session"
                    @click="users.iniciarSesionAnonimamente"
                    >
                    Iniciar sesion de forma Anonima
                </p>
        </div>
        </div>

</template>

<style scoped>

    .body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    h2 {
            text-align: center;
            color: #333;
    }
    form {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 70px;
        width: 300px;
       
    }
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
    }
    input[type="email"],
    input[type="password"] {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    input[type="submit"] {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
    }
    input[type="submit"]:hover {
        background-color: #45a049;
    }
    .google_session{
        cursor: pointer;
    }
    .google_session:hover {
        color: blue;
    }

    .alert {
        background-color: #E35232;
        padding: 7px;
        text-align: center;
        color: white;
        border-radius: 15px;
        margin-bottom: 15px;
    }
</style>