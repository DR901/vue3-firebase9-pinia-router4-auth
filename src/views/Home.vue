<script setup>

import { useUserStore } from '../stores/users'
import { useDatabaseStore } from '../stores/database';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const databaseStore = useDatabaseStore();
const userStore = useUserStore();

databaseStore.getUrls();

const urls = ref('');
const handleSubmit =() => {
    databaseStore.addUrl(urls.value);
}

const router = useRouter();

</script>

<template>
    <div>
        <h1> HOME </h1>
        <p> {{  userStore.userData?.email }}</p>

        <form  @submit.prevent="handleSubmit">

            <input type="text" placeholder="Ingrese URL" v-model="urls">
            <button type="submit"> Agregar </button>

        </form>

        <p v-if="databaseStore.loadingDoc"> Loading Docs...</p>
        <ul v-else>    
            <li v-for="item of databaseStore.documents" :key="item.id"> 
                Nombre - {{  item.name }} 
                <br> Id- {{ item.id }}
                <br> Nombre Corto - {{ item.short }}
                <br> <button @click="databaseStore.deleteUrl(item.id)"> Eliminar </button>
                     <button @click="router.push(`/editar/${item.id}`)"> Editar </button>
                <p></p>
            </li>
        </ul>
    </div>
</template>