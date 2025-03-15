import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { AccountData } from '@/types/accounts'

export const useAccountsStore = defineStore('Accounts', () => {
  const accounts = useLocalStorage<AccountData[]>('test-accounts', [])

  return { accounts }
})
