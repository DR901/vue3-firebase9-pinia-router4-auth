<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/users';
//import { useRouter } from 'vue-router';

//const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const password = ref('');

const handleSubmit = async() => {
    if (!email.value || password.value.length < 6){
        return alert('Llena Campos solicitados');
    }
    await userStore.registerUser(email.value, password.value);
    console.log('Procesando Form...');
    //router.push('/');
    
}



</script>

<template>
    <div>
        <h1> Register </h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser"> Crear Usuario</button>
        </form>
    </div>
</template>