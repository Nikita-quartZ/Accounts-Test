<script setup lang="ts">
import accountItem from "@/components/accountItem.vue"
import createDialog from "@/components/createDialog.vue"
</script>

<template>
  <div class="control">
    <header class="flex items-center py-5">
      <h2 class="text-2xl mr-3">
        Учетные записи
      </h2>
      <createDialog />
    </header>
    <main>
      <div class="bg-gray-600 flex items-center p-2 rounded-md mb-4">
        <i class="pi pi-question-circle mr-3"></i>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </div>

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
            <accountItem></accountItem>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
