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
  
  async function orderbyDate () {
    Orderedtodobyname.value=false;
    if(!ShowisReadyTodo.value) {
    const response= await axios.get('http://localhost:3000/api/todo/sortedbyDate');
    Todos.value=response.data;}
    else {
      const response= await axios.get('http://localhost:3000/api/todo/allsortedbyDate');
    Todos.value=response.data;}
    }  
    
  async function orderbyName () {
    Orderedtodobyname.value=true;
    if(!ShowisReadyTodo.value) {
    const response= await axios.get('http://localhost:3000/api/todo');
    Todos.value=response.data;}
    else {
      const response= await axios.get('http://localhost:3000/api/todo/allsortedbyName');
    Todos.value=response.data;}
    }

  return { UserName, NotLogged, DayliList, Todos, Task, Orderedtodobyname, orderbyDate, orderbyName,
    ShowisReadyTodo
   }

})
