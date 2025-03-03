import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('store', () => {
  const LoginName = ref("bls")
  

  return { LoginName }
})
