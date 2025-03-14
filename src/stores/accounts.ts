import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAccounts = defineStore('Accounts', () => {
  const accounts = useLocalStorage('test-accounts', [])

  return { accounts }
})
