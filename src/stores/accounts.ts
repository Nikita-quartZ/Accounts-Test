import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAccountsStore = defineStore('Accounts', () => {
  const accounts = useLocalStorage('test-accounts', [])

  return { accounts }
})
