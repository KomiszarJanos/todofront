<script setup>
import Basic from '../components/BasicView.vue'
import TheFooter from '../components/TheFooter.vue'
import TheNavBar from '../components/TheNAVBar.vue'
import { useCounterStore } from '@/stores/store'

const store=useCounterStore();
console.log(store.LoginName);
</script>

<template>


    <TheNavBar><p>{{ store.LoginName }}</p></TheNavBar>
    <Basic></Basic>
    <TheFooter></TheFooter>

<v-else>
    <h1>Bejelentkezés szükséges</h1>
</v-else>

 
  
</template>

<style>

</style>
