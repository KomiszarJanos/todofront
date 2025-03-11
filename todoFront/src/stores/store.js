import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import Swal from 'sweetalert2'

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
    const Users=ref();
    const FoundedTodo=ref();
    
    async function EnterProjectsForm(id) {
    ShowProjects.value=false;
    const response= await axios.get(`http://localhost:3000/api/todo/${id}`);
    const userresponse=await axios.get((`http://localhost:3000/api/user/name`));
    Users.value=userresponse.data;
    FoundedTodo.value=response.data;
    console.log(FoundedTodo.value);
    if(FoundedTodo.value.Found.Ready)  {NotArchivedProject.value=false;}
    else {NotArchivedProject.value=true;}
  
  }
   
  function ExitProjectsForm() {ShowProjects.value=true;}
  
  const NotArchivedProject=ref();
  const NewTask=reactive({
    "DeadlineDate":"",
    "Desc":"",
    "User":"",
    "ProjectId":"",
    "Ready":false
        })

  function SendNewTask() {
    NewTask.ProjectId=FoundedTodo.value.Found._id;
    if(NewTask.DeadlineDate=="" || NewTask.Desc=="" || NewTask.User=="")
      { console.log("hiba");
        Swal.fire({ position: 'top-center',
        icon: 'error',
        title: 'Kérem a táblázat minden adatát feltölteni!!!',
        showConfirmButton: false,
        timer: 1500  });}
    else {
    axios.post('http://localhost:3000/api/task',{  
      "DeadlineDate": NewTask.DeadlineDate,
      "Desc":NewTask.Desc,
      "User":NewTask.User,
      "ProjectId":NewTask.ProjectId,
      "Ready":NewTask.Ready});
      Swal.fire({ position: 'top-center',
        icon: 'success',
        title: 'Új feladat rögzítésre került',
        showConfirmButton: false,
        timer: 1500  });
     orderbyName();
     ExitProjectsForm();
      }
  }

  function ArchivateProject() {
    let ProjectId=FoundedTodo.value.Found._id;
    Swal.fire({ position: 'top-center',
      icon: 'warning',
      title: 'Biztos, hogy módosítod a Project státuszát?',
      showConfirmButton: true,
      confirmButtonText:"Végrehajt",
      showCancelButton:true,
      cancelButtonText:"Mégse", }).then((result)=>{if(result.isConfirmed)
      {axios.put(`http://localhost:3000/api/todo/${ProjectId}`);
      orderbyName();
      ExitProjectsForm();   
    } 
      else {Swal.close()}
    })
  }

  return { UserName, NotLogged, DayliList, Todos, Task, Orderedtodobyname, orderbyDate, orderbyName,
    ShowisReadyTodo,EnterProjectsForm, ShowProjects, ExitProjectsForm, NotArchivedProject, FoundedTodo,
  NewTask, Users, SendNewTask, ArchivateProject }

})
