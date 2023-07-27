<script setup>
    import {usersStore} from '../stores/auth'
    
    const users = usersStore()

    const handleSubmit = () => {
        console.log("estoy en handleSubmit");
        users.loginUser()
    }
</script>

<template>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Formulario de inicio de sesión</title>
    </head>
    <body>
        <div>

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
        </div>
    </body>
    </html>
</template>

<style scoped>

    body {
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
        padding: 20px;
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
</style>