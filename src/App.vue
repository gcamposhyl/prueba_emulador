<script setup>
  import { RouterView, RouterLink } from 'vue-router'
  import {usersStore} from './stores/auth'

  const user = usersStore()

</script>

<template>
  <nav>
    <ul
      v-if="user.userLogin"
    >
      <li>
          <RouterLink
            class="router"
            :to="{name:'tus-archivos'}"
          >

            Tus archivos
          </RouterLink>
        </li>
        <li 
          class="logout"
          @click="user.logout"
        >
          <a ><p>Cerrar sesion</p></a>
        </li>
    </ul>

    <ul
      v-else
    >
      <li>
        <RouterLink
          class="router"
          :to="{name:'login'}"
        >

          Login
        </RouterLink>
      </li>
      <li>
        <RouterLink
          class="router"
          :to="{name:'registro'}"
        >

          Register
        </RouterLink></li>
      

      <li>
       
      </li>
    </ul>
  </nav>

  <div>  
    <RouterView />
  </div>
 

</template>
<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li {
    float: left;
  }

  li, .router {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* Change the link color to #111 (black) on hover */
  li a:hover {
    background-color: #111;
  }

  .logout {
    cursor: pointer;
    padding: 14px 16px;
  }

  .logout :hover {
    color: red;
    
  }
</style>