<script setup>

import { useUserStore } from '../stores/users'

const userStore = useUserStore();

</script>

<template>
    <div>
        <h1> HOME </h1>
        <p> {{  userStore.userData?.email }}</p>
    </div>
</template>