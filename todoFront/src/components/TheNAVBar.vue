<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from '@/stores/store';

const store=useCounterStore();
function changeView() {
  if(store.DayliList==true) {store.DayliList=false;}
  else {store.DayliList=true;}
}


</script>


 <template>
  <div>
    <v-toolbar image="./sztelogoblue.jpeg">
      
      
      <v-toolbar-title>
        <span>SZTE Beszerzések Nyilvántartója</span>
        </v-toolbar-title>
        
      <v-btn icon @click="changeView()" v-if="store.DayliList">
        <Router-link :to="{name:'login'}">
        <span> 
            <v-icon title="Projekt nézet">mdi-format-list-numbered</v-icon>
        </span></Router-link>
      </v-btn>
      <v-btn icon @click="changeView()" v-else>
        <Router-link :to="{name:'daily'}">
        <span> 
            <v-icon title="Feladat nézet">mdi-list-box</v-icon>
        </span></Router-link>
      </v-btn>


      <v-btn icon v-if="!store.DayliList" @click="store.DoShowNewProjectForm()">
        <span>
            <v-icon title="Új project" >mdi-folder-plus</v-icon>
        </span>
      </v-btn>
      <v-btn icon>
        <span>
        <v-icon title="Kilépés">mdi-export</v-icon>
        </span>
      </v-btn>
      

    </v-toolbar>
  </div>

 
</template>

<style scoped>
span {color:white}
</style>
