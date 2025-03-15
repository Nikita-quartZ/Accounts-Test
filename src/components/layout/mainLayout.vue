<script setup lang="ts">
import AccountItem from "@/components/accountItem.vue"
import InfoMessage from "@/components/infoMessage.vue"

import { useAccountsStore } from '@/stores/accounts'

const store = useAccountsStore()
</script>

<template>
  <main>
    <InfoMessage />

    <section>
      <table class="w-full">
        <thead>
          <tr class="pb-2">
            <td class="pb-2">Метки</td>
            <td class="pb-2">Тип записи</td>
            <td class="pb-2">Логин</td>
            <td class="pb-2">Пароль</td>
            <td class="pb-2"></td>
          </tr>
        </thead>

        <tbody>
          <AccountItem :account v-for="account in store.accounts" :key="account.id" />
        </tbody>
      </table>
    </section>
  </main>
</template>
