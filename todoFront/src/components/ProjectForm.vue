<template>
<div>
<div class="backdrop"></div>

<div v-if="!store.ShowNewProjectForm">
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
            <h4>Lezárt Project! Feladat rögzítése elött helyezze folyamatba a projectet! Majd lépjen be újra a feladat rögzítéséhez.</h4>
            </div>
            <div class="FormData4">
            <h3>Feladat folyamatbahelyezése</h3>
            <div class="rogzitbutton">
            <button class="btnarchiv" @click="store.ArchivateProject">Újra aktíválás</button>
            </div>
    </div>
    </div>
    </div>
    <div v-else>
        <div  class="FormContainer">
        <div class="exitbutton" title="kilépés">
        <button @click="store.ExitProjectsForm"><span class="xbutton">X</span></button>
        </div>
        <div class="FormData1">
            <h3>Új Project rögzítése:</h3>
            <div class="Data">
            <label >Project név:</label>
            <input type="text" v-model="store.NewProjectName">
            </div>
                      
            <div class="rogzitbutton">
            <button class="btnrogzit" @click=store.CreateNewProject>Rögzít</button>
            </div>
        </div>

    </div>



    </div>
</div>
</template>

<script setup>
import { useCounterStore } from '@/stores/store';
const store=useCounterStore();
</script>

<style scoped>
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
                box-shadow: rgb(71, 66, 66) 20px 22px 12px;
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