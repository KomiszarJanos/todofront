import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import Swal from 'sweetalert2'
import * as XLSX from "xlsx"
import { saveAs } from 'file-saver';

export const useCounterStore = defineStore('store', () => {
  const UserName = ref();
  const NotLogged=ref(true);
  const DayliList=ref(false);
  const Todos=ref();
  const Task=ref();
  const Orderedtodobyname=ref(true);
  const ShowisReadyTodo=ref(false);
  const ShowProjects=ref(true);
  const SearchName=ref();
  const ShowNewProjectForm=ref(false);
  const NewProjectName=ref();
  
  
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
    ShowNewProjectForm.value=false;
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
        title: 'Kérem a táblázat minden adatát feltölteni!!! E nélkül a feltöltés nem lehetséges',
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

  function ArchivateProject() 
  { let ProjectId=FoundedTodo.value.Found._id;
    let Ready=FoundedTodo.value.Found.Ready;
    if(Ready) {
      Swal.fire({ position: 'top-center',
      icon: 'warning',
      title: 'Biztos, hogy folyamatba helyezed a Projectet?',
      showConfirmButton: true,
      confirmButtonText:"Folyamatba helyez",
      showCancelButton:true,
      cancelButtonText:"Mégse", }).then((result)=>{
        if(result.isConfirmed)
        {axios.put(`http://localhost:3000/api/todo/${ProjectId}`,{DoneReadyBy:UserName.value});
        orderbyName();
        ExitProjectsForm();  } 
        else {Swal.close()} })
    }
    else {
      Swal.fire({ position: 'top-center',
      icon: 'warning',
      title: 'Biztos, hogy lezárod a Projectet?',
      showConfirmButton: true,
      confirmButtonText:"Lezár",
      showCancelButton:true,
      cancelButtonText:"Mégse", }).then((result)=>{
          if(result.isConfirmed)
          {axios.put(`http://localhost:3000/api/todo/${ProjectId}`,{DoneReadyBy:UserName.value});
          orderbyName();
          ExitProjectsForm();  } 
          else {Swal.close()} })
  } }
  async function SearchByName() {console.log(SearchName.value);
    if(SearchName.value!="")
    {Todos.value=await axios.get(`http://localhost:3000/api/search?searchTerm=${SearchName.value}`).then(console.log(Todos.value));}
  }
  function DoShowNewProjectForm() {
    ShowProjects.value=false;
    ShowNewProjectForm.value=true; 
    console.log(ShowNewProjectForm.value);}

 function CreateNewProject () {
  const date=new Date();
  const ready=false;
  if(NewProjectName.value!="") {
    axios.post(`http://localhost:3000/api/todo`,
      {Date:date, Name:NewProjectName.value, Ready:ready })
      Swal.fire({ position: 'top-center',
        icon: 'success',
        title: 'Új Project rögzítésre került',
        showConfirmButton: false,
        timer: 1500  });
      orderbyName();
      ExitProjectsForm();
    }
    else {
      Swal.fire({ position: 'top-center',
        icon: 'error',
        title: 'A Project név megadása kötelező! ',
        showConfirmButton: false,
        timer: 1500  });}
    }
    function Export () {
      
      const flottendata=Todos.value.map(item=>({
        Date:formatdate(item.Date),
        Name:item.Name,
        Done:item.Done.map(d=> `${formatdate(d.Date)}-${d.Desc}-${d.User}`).join("; \n"),
        Ready:item.Ready,
        DoneReadyBy: item.DoneReadyBy,
        DoneReadyDate: formatdate(item.DoneReadyDate),
        Task:item.tasks.map(d=> `${formatdate(d.DeadlineDate)}-${d.Desc}-${d.User}`).join("; \n"),

      }));
      const ExcelSheet=XLSX.utils.json_to_sheet(flottendata, {cellStyles:true});
      Object.keys(ExcelSheet).forEach(cell=>{
        if(cell[0] !=="!") { ExcelSheet[cell].s={alignement: {wrapText:true}};
        }
      });
      const e=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(e,ExcelSheet,"Adatok");
      const ExcelBuffer=XLSX.write(e, {bookType:"xlsx", type:"array"});
      const data=new Blob([ExcelBuffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      saveAs(data,"projectek.xlsx");
    }
    function formatdate(datestring) {const date=new Date(datestring); 
      return date.toLocaleDateString("hu-Hu")};

  return { UserName, NotLogged, DayliList, Todos, Task, Orderedtodobyname, orderbyDate, orderbyName,
    ShowisReadyTodo,EnterProjectsForm, ShowProjects, ExitProjectsForm, NotArchivedProject, FoundedTodo,
  NewTask, Users, SendNewTask, ArchivateProject, SearchName, SearchByName, ShowNewProjectForm, DoShowNewProjectForm,
NewProjectName, CreateNewProject, Export}

})
