<script setup>

import { useCounterStore } from '@/stores/store';
import axios from 'axios';
import { onMounted,ref } from 'vue';

const store=useCounterStore();
const Projecttodo=ref();

onMounted(async ()=>{
  try{
  const response= await axios.get('http://localhost:3000/api/todo');
  Projecttodo.value=response.data;}
catch (error) {console.error}}
)
console.log(store.Todos);

</script>

<template>
  <div class="container" v-if="!store.NotLogged">
  <h1 > Folyamatban lévő projektek </h1>
    
  <table>
    <thead>
      <tr>
        <th>Projekt név</th>
        <th>Kezdési dátum</th>
        <th>Elvégzett feladatok</th>
        <th>Project szerkesztése</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in store.Todos.todo" :key="p._id">
        <td>{{p.Name}}</td>
        <td>{{p.Date}}</td>
        <td>2024.12.23</td>
        <td><button>Szerkeszt</button></td>
        
      </tr>
    </tbody>

  </table>
</div>
<div v-else>
<h1>Belépés szükséges!</h1>
</div>
</template>

<style scoped>
.container {position: relative;  width:100%; min-height: 400px; margin:0; padding:0;}
.container::before {content:""; position:fixed; top:0; left:0; width:100%; height: 100%; background-image: url(./sztelogo.jpg); background-position: center; background-repeat: no-repeat; background-size:contain; opacity: 0.3; z-index: -1;}
h1 {margin-top: 22px; margin-bottom: 12px; margin-left: auto; margin-right: auto;}
thead {background-color: rgb(184, 184, 189); width: 600px; padding: auto; margin-top: 12px; margin-top:12px; margin-left: auto; margin-right: auto;}
</style>
