<script setup lang="ts">
import { ref } from 'vue'

import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const visible = ref(false)

const options = [
  {
    name: 'LDAP',
    key: 'LDAP',
  },
  {
    name: 'Локальная',
    key: 'Local',
  },
]
</script>

<template>
  <Button @click="visible = true" icon="pi pi-plus" size="small" outlined />

  <Dialog v-model:visible="visible" modal header="Добавить аккаунт" :style="{ width: '25rem' }">
    <p class="mb-2">
      Метки
    </p>
    <InputText fluid />
    <p class="pt-2 mb-2">
      Тип записи
    </p>
    <Select fluid :options optionLabel="name" optionValue="key" />
    <p class="pt-2 mb-2">
      Логин
    </p>
    <InputText fluid />
    <p class="pt-2 mb-2">
      Пароль
    </p>
    <InputText fluid />
  </Dialog>
</template>
