import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('store', () => {
  const UserName = ref();
  const NotLogged=ref(true);
  const DayliList=ref(false);
  const Todos=ref();
  const Task=ref();

  return { UserName, NotLogged, DayliList, Todos, Task }
})
