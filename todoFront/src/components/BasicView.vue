<script setup>
import { watch } from 'vue';
import { useCounterStore } from '@/stores/store';

const store=useCounterStore();
watch(()=>store.ShowisReadyTodo, (newValue)=>{
  if(!store.Orderedtodobyname) {store.orderbyDate();}
  else {store.orderbyName();}
  })
</script>

<template>
  <div class="container" v-if="!store.NotLogged">
  <h1 > Folyamatban lévő projektek </h1>
  <div class="searchcontainer">
  <v-text-field 
        max-width=30%
        v-model="search"
        label="Keresés név alapján"
        prepend-inner-icon="mdi-magnify"
        hide-details
        single-line
      ></v-text-field>
      <v-text-field 
        max-width=30%
        v-model="search"
        label="Keresés dátum alapján"
        prepend-inner-icon="mdi-magnify"
        hide-details
        single-line
      ></v-text-field>
    </div>  
  <table class="mainTable">
    <thead>
      <tr>
        <th>
          <button @click="store.orderbyName" :disabled="store.Orderedtodobyname">
          <v-icon v-if="store.Orderedtodobyname">mdi-close-octagon-outline</v-icon>
          <v-icon v-else>mdi-arrow-down-drop-circle-outline</v-icon>
          </button></th>
        <th>
          <button @click="store.orderbyDate" :disabled="!store.Orderedtodobyname">
          <v-icon v-if="store.Orderedtodobyname">mdi-arrow-down-drop-circle-outline</v-icon>
          <v-icon v-else>mdi-close-octagon-outline</v-icon>
        </button></th>
        <th colspan="2">
          <div>
            <input class="input" type="checkbox" name="isready" v-model="store.ShowisReadyTodo">
            <label for="isready">Mutassa a lezárt projecteket is?</label>
          </div></th>
        
        <th>Rendezés</th>
      </tr>
      <tr>
        <th>Projekt név</th>
        <th>Kezdési dátum</th>
        <th>Elvégzett feladatok</th>
        <th>Folyamatban lévő feladatok</th>
        <th>Project szerkesztése</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in store.Todos.todo" :key="p._id">
        <td class="bordered tdName">{{p.Name}}</td>
        <td class="bordered tdDate">{{ new Date(p.Date).toLocaleDateString('hu-Hu')}}</td>
        <td class="bordered tdDone" > 
          <table>
          <tr  v-for="d in p.Done">
            <td class="firsttd">{{new Date(d.Date).toLocaleDateString('hu-Hu')}}</td>
            <td class="secondtd">{{ d.Desc }}</td>
            <td class="thirdtd">{{ d.User }}</td>
          </tr> 
          </table>
        </td>
        <td class="bordered tdDo">
          {{ p._id }}</td>
        <td class="ordercenter bordered"><v-btn 
          rounded-lg
          size="small"
          color="blue-darken-4"
          prepend-icon="mdi-pen" >        
          <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
          
          Szerkeszt</v-btn></td>
        
      </tr>
    </tbody>

  </table>
  <div class="excelbutton"><button>Excel készítése</button></div>
</div>
<div v-else>
<h1>Belépés szükséges!</h1>
</div>
</template>

<style scoped>
.container {position: relative;  width:100%; max-width: 100%; min-height: 400px; margin:0; padding:3px;}
.container::before {content:""; position:fixed; top:0; left:0; width:100%; height: 100%; background-image: url(./sztelogo.jpg); background-position: center; background-repeat: no-repeat; background-size:contain; opacity: 0.3; z-index: -1;}
h1 {margin-top: 22px; margin-bottom: 12px; margin-left: auto; margin-right: auto;}
.mainTable {width:90%; max-width:80%; margin-left: auto; margin-right: auto; border:black solid 2px; 
  padding:1px; background-color: rgba(186, 186, 186, 0.4); border-collapse: collapse; word-wrap: break-word; overflow: hidden;}
thead {background-color: rgb(184, 184, 189); padding: auto; margin-top: 12px; margin-top:12px; margin-left: auto; margin-right: auto;}
.bordered, th {border:black solid 1px; padding: 5px;}

th { padding: 3px;}
.tdName {width:10%;}
.tdDate {width:10%;}
.tdDone {width:35%; overflow: hidden;}
.tdDo {width:35%; overflow: hidden;}
.ordercenter { vertical-align: middle; text-align: center; width:10%;
}
li {list-style: none;}
.secondtd {width: 60%; }
.firsttd {width:30%;}
.thirdtd {width:10%; padding-left: 10px;}
.excelbutton {margin-top: 24px; margin-bottom: 24 px; margin-left: auto; margin-right: auto; text-align: center; border: 2px blue solid; width:60%; 
  background-color: rgba(186, 186, 186, 0.9); border-radius: 6px; box-shadow: gray 3px 2px;} 
.input {margin-right: 12px;}
.searchcontainer {display: flex; justify-content: space-around; align-items: center; margin-bottom: 34px; margin-top:34px; height: 20px;}
</style>
