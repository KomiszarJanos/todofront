<template>
    <div>
    <div class="backdrop"></div>  
       <div  class="FormContainer">
            <div class="exitbutton" title="kilépés">
            <button @click="store.ExitTaskForm"><span class="xbutton">X</span></button>
            </div>
            <div class="FormData1">
                <h3>Feladat szerkesztése:</h3>
                <div class="Data">
                <label >Elvégzett feladat leírása:</label>
                <textarea class="area" v-model="store.FoundedTask.task.Desc">
                    </textarea>
                </div>
                <div class="Data">
                <label>Lezárja a feladatot?</label>
                <input type="checkbox" v-model="store.CloseTask">
                </div>
                <div class="Data">
                <label>Kíván új feladatot rögzíteni a projecthez?</label>
                <input type="checkbox" v-model="store.CreateNewTask">
                </div>
                <div v-if="store.CreateNewTask" class="DataInner">
                    <div class="Data">
                    <label>Új feladat határideje:</label>
                    <input type="date" v-model="store.NewTask.DeadlineDate">
                    </div>
                    <div class="Data">
                    <label>Feladat felelőse:</label>
                    <select v-model="store.NewTask.User" >
                    <option v-for="u in store.Users.UserNames" :value=u :key="u">{{ u }}</option>
                    </select>
                    </div>
                    <div class="Data">
                    <label >Feladat leírása:</label>
                    <textarea class="area" v-model="store.NewTask.Desc"></textarea>
                    </div>
                    </div>
                <div class="rogzitbutton">
                <button class="btnrogzit" @click=store.SendNewTask>Rögzít</button>
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
        justify-content:left; align-items:flex-start; width: 100%; text-align: left;
        padding:4px; margin-bottom:0; margin-right: 4px; margin-left: 0; border-radius: 4px;}
    
    .Data { width:100%; display: flex; justify-content: space-between; align-items: flex-start; padding:4px; margin:2px;}
    .DataInner{width:100%;}
    input, select, textarea {width:60%; background-color: rgb(184, 187, 231); border-radius: 4px; color: white;}
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
    .area {min-height: 60px;}
    
    </style>