<script setup lang="ts">
import Select from 'primevue/select';

const value = defineModel()

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
  <Select v-model="value" fluid :options optionLabel="name" optionValue="key" />
</template>
