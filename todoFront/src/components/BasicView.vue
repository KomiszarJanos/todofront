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
  <div >
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
      <tr v-for="p in store.Todos" :key="p._id">
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
          <table>
          <tr  v-for="d in p.tasks">
            <td class="firsttd">{{new Date(d.DeadlineDate).toLocaleDateString('hu-Hu')}}</td>
            <td class="secondtd">{{ d.Desc }}</td>
            <td class="thirdtd">{{ d.User }}</td>

          </tr> 
          </table>
        
        
        </td>
        <td class="ordercenter bordered"><v-btn
          @click="store.EnterProjectsForm(p._id)"
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
<div v-if="!store.ShowProjects">
<div class="backdrop"></div>
<div  class="FormContainer" v-if="store.NotArchivedProject">
  <div class="exitbutton" title="kilépés">
    <button @click="store.ExitProjectsForm"><span class="xbutton">X</span></button>
  </div>
  
  <div class="FormData1">
    <h3>Új feladat rögzítése:</h3>
    <div class="Data">
    <label >Feladat leírása:</label>
    <input type="text" v-model="store.NewTask.Desc">
    </div>
    <div class="Data">
    <label>Feladat határideje:</label>
    <input type="date" v-model="store.NewTask.DeadlineDate">
    </div>
    <div class="Data">
    <label>Feladat felelőse:</label>
    <select v-model="store.NewTask.User" >
      <option v-for="u in store.Users.UserNames" :value=u :key="u">{{ u }}</option>
 
    </select>
    </div>
    <div class="rogzitbutton">
    <button class="btnrogzit" @click=store.SendNewTask>Rögzít</button>
    </div>
  </div>
  
  <div class="FormData2">
    <h3>Feladat kivezetése</h3>
    <div class="rogzitbutton">
      <button class="btnarchiv" @click="store.ArchivateProject">ARCHIVAL</button>
      </div>
    </div>
  

</div>

<div  class="FormContainer" v-else>
  <div class="exitbutton" title="kilépés">
    <button @click="store.ExitProjectsForm"><span class="xbutton">X</span></button>
  </div>
  
  <div class="FormData3">
    <h4>Lezárt Project Feladat rögzítése elött helyezze folyamatba a projectet! Majd lépjen be újra a feladat rögzítéséhez.</h4>
  </div>
  
  <div class="FormData4">
    <h3>Feladat folyamatbahelyezése</h3>
    <div class="rogzitbutton">
      <button class="btnarchiv">Újra aktíválás</button>
      </div>
    </div>
  

</div>


</div>
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
.FormContainer {position:fixed; left:50%; top:50%; 
                transform:translate(-50%, -50%); z-index: 3;
                min-width:60%; min-height: 40%;
                background-color: rgb(235, 211, 211);
                border:black 2px solid;
                border-radius: 10px; padding: 10px;
                display: flex; justify-content: space-between; 
                align-items: flex-start; flex-direction: row;
                flex-wrap: nowrap;
                padding: 24px;
              }
.backdrop {position:fixed; top:0; left:0; width: 100vw; min-height: 100%; background: rgba(0,0,0, 0.3);
z-index: 2;}
.FormData1 { background-color:rgb(176, 232, 240); display: flex; flex-direction: column;
    justify-content:left; align-items:flex-start; width: 80%; text-align: left;
    padding:4px; margin-bottom:0; margin-right: 4px; margin-left: 0; border-radius: 4px;}
.FormData2 {
   width:20%; display: flex; flex-direction: column;  justify-content:left; align-items:flex-start;}
.FormData3 { background-color:rgb(176, 232, 240); width: 50%; text-align: left;
    padding:4px; margin-bottom:auto; margin-top: auto; margin-right: auto; margin-left: auto; vertical-align: middle; border-radius: 4px;}
.FormData4 {
   width:50%; display: flex; flex-direction: column;  justify-content:left; align-items:flex-start; margin-left: 12px; }  
.Data { width:100%; display: flex; justify-content: space-between; align-items: flex-start; padding:4px; margin:2px;}
input, select{width:60%; background-color: rgb(65, 75, 219); border-radius: 4px; color: white;}
label {width:40%;}
h3 {margin-bottom: 12px; text-align: center; margin-top: 12px;}
.rogzitbutton { width: 100%;
  margin-left: auto; margin-right: auto; margin-top: 24px; margin-bottom: 12px;
  text-align: center;}
.btnrogzit{ background-color: rgb(121, 233, 121); padding:4px; border-radius: 5px; border:1px solid green; box-shadow: green 3px 3px;}
.btnarchiv { width:90%;
  background-color: rgb(230, 138, 138); padding:4px; border-radius: 5px; border:1px solid rgb(43, 41, 39); box-shadow: rgb(233, 182, 159) 3px 3px;}
@media (max-width: 800px){
  .FormContainer {flex-wrap: wrap;}
  .FormData1, .FormData2 {width: 100%;}
}
.exitbutton {position:absolute; top:3px; right:3px; margin-left: auto; width: 15px;
  margin-right: auto; text-align: center;}
.xbutton {font-weight: bold; color: rgb(75, 73, 73);}
h4 {color: red; text-align: center;}


</style>
