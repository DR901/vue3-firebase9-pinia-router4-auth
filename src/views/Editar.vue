<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';

const route = useRoute();
const databaseStore = useDatabaseStore();

const url = ref('');

onMounted( async ()  => {
    url.value = await databaseStore.leerUrl(route.params.id);
})

const handleSubmit = () => {
    console.log('Editar Url');
    /// validaciones de el input
    databaseStore.updateUrl(route.params.id, url.value);
}

</script>

<template>

<div>

    <h1> Editar id: route.params </h1>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese URL" v-model="url"> <!-- acceso texto de url-->
        <button type="submit"> Editar </button>
    </form>
</div>

</template>