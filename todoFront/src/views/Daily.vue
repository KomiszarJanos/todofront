<script setup>
import Basic from '../components/BasicView.vue'
import TheFooter from '../components/TheFooter.vue'
import TheNavBar from '../components/TheNAVBar.vue'
import { useCounterStore } from '@/stores/store'

const store=useCounterStore();

</script>

<template>
   <div v-if="!store.NotLogged">
    <h1>Feladatok</h1>
    <table>
    <thead>
      <tr>
        <th>Határidő</th>
        <th>Feladat</th>
        <th>Project Név</th>
        <th>Felelős</th>
        <th>Szerkeszt</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in store.Task.task" :key="p._id">
        <td>{{p.DeadlineDate}}</td>
        <td>{{p.Desc}}</td>
        <td>{{ p.ProjectName }}</td>
        <td>{{ p.User }}</td>
        <td><button>Szerkeszt</button></td>
        
      </tr>
    </tbody>

  </table>
   </div>
   <div v-else>
    <h1>Belépés szükséges</h1>
   </div>
    

  
</template>

<style>

</style>
