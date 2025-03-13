<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheFooter from './components/TheFooter.vue'
import TheNavBar from './components/TheNAVBar.vue'
import { useCounterStore } from '@/stores/store';

const store=useCounterStore();
</script>

<template>
<TheNavBar v-if="!store.NotLogged"></TheNavBar>
<v-fade-transition>
<RouterView />
</v-fade-transition>
<TheFooter v-if="!store.NotLogged"></TheFooter>
</template>

<style scoped>

</style>
