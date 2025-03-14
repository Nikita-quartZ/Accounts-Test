<script setup lang="ts">
import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

const { type } = defineProps<{
  type: string
}>()

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
  <tr class="mb-2">
    <th class="pr-2 w-1/5">
      <InputText fluid />
    </th>
    <th class="pr-2 w-1/5">
      <Select fluid :options optionLabel="name" optionValue="key" />
    </th>
    <th class="pr-2" :colspan="type === 'LDAP' ? 1 : 2">
      <InputText fluid />
    </th>
    <th class="pr-2 w-1/5" v-if="type === 'LDAP'">
      <InputText fluid />
    </th>
    <th class="max-w-4">
      <Button icon="pi pi-trash" outlined />
    </th>
  </tr>
</template>
