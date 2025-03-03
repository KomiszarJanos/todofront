<template>
  <v-overlay :model-value="submittrue" class="align-center justify-center">
      <v-progress-circular v-if="submittrue"
      color="white"
      indeterminate
      >
  
    </v-progress-circular>
    </v-overlay>
  <div v-if="Notlogged" class="background pt-14">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit()" >
        <v-text-field
          prepend-inner-icon="mdi-account-outline"
          v-model="LoginName"
          class="mb-2"
          label="Belépési Név"
          clearable
        ></v-text-field>
        <v-text-field
         :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="Password"
          :type="visible ? 'text' : 'password'"
          label="Jelszó"
          placeholder="Add meg a jelszavad"
          clearable
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal" >
          <v-card-text class="text-medium-emphasis text-caption">
            3 sikertelen próbálkozás után a felhasználó tiltásra kerül. Ezt követően az admin tudja a tiltást feloldani!
          </v-card-text>
        </v-card>
        <v-btn
          :disabled="!form"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block >
          Belépés
        </v-btn>
      </v-form>
    </v-card>
  </div>
  <div v-else>
    <TheNavBar></TheNavBar>
    <Basic></Basic>
    <TheFooter></TheFooter>
    <p>{{ LoginName }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/store';
import Basic from '../components/BasicView.vue'
import TheFooter from '../components/TheFooter.vue'
import TheNavBar from '../components/TheNAVBar.vue'
import Swal from 'sweetalert2'


const router=useRouter();
const form= ref(false);
const LoginName=ref();
const Password=ref();
const visible=ref(false);
const store=useCounterStore()
const Notlogged=ref(true);
const submittrue=ref(false);

function onSubmit () {
    
    setTimeout(() => (check()), 2000) };

function check () {
  if(LoginName.value=='Jani' && Password.value=='Jani') {
    submittrue.value=true;
    setTimeout(() => { submittrue.value=false; Notlogged.value=false;  }, 2000) }

  else {
    submittrue.value=true;
    setTimeout(() => { submittrue.value=false; }, 2000);
    Swal.fire({ position: 'top-center',
                icon: 'error',
                title: 'Nem megfelelő név vagy jelszó páros kérem vegye fel a kapcsolatot az adminnal',
                showConfirmButton: false,
                timer: 1500  }); }
  }

  
                  
         
  
</script>
<style scoped>
.background {  
  background-image: url('/rektori_mod1.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; height: 100vh;}
</style>
