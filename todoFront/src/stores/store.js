import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore('store', () => {
  const UserName = ref();
  const NotLogged=ref(true);
  const DayliList=ref(false);
  const Todos=ref();
  const Task=ref();
  const Orderedtodobyname=ref(true);
  const ShowisReadyTodo=ref(false);
  const ShowProjects=ref(true);
  
  async function orderbyDate () {
    Orderedtodobyname.value=false;
    if(!ShowisReadyTodo.value) {
    const response= await axios.get('http://localhost:3000/api/todo/notreadywithtasksbyDate');
    Todos.value=response.data;}
    else {
      const response= await axios.get('http://localhost:3000/api/todo/allwithtasksbydate');
    Todos.value=response.data;}
    }  
    
  async function orderbyName () {
    Orderedtodobyname.value=true;
    if(!ShowisReadyTodo.value) {
    const response= await axios.get('http://localhost:3000/api/todo/notreadywithtasksbyname');
    Todos.value=response.data;}
    else {
      const response= await axios.get('http://localhost:3000/api/todo/allwithtasksbyname');
    Todos.value=response.data;}
    }
  
    async function EnterProjectsForm(id) {
    ShowProjects.value=false;
    const response= await axios.get(`http://localhost:3000/api/todo/${id}`);
    FoundedTodo.value=response.data;
    if(FoundedTodo.value.Found.Ready)  {NotArchivedProject.value=false;}
    else {NotArchivedProject.value=true;}
    console.log(NotArchivedProject.value);
  
  }
   
  function ExitProjectsForm() {ShowProjects.value=true;}
  const NotArchivedProject=ref();
  const FoundedTodo=ref();

  return { UserName, NotLogged, DayliList, Todos, Task, Orderedtodobyname, orderbyDate, orderbyName,
    ShowisReadyTodo,EnterProjectsForm, ShowProjects, ExitProjectsForm, NotArchivedProject, FoundedTodo }

})
