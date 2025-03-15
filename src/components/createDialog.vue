<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid';

import Message from 'primevue/message';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { useAccountsStore } from '@/stores/accounts'

const store = useAccountsStore()

const visible = ref(false)

const startValidating = ref(false)

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

const form = ref({
  tags: '',
  type: 'LDAP',
  login: null,
  password: null,
})

const validate = computed(() => {
  if (!startValidating.value) {
    return {
      tags: true,
      login: true,
      password: true,
    }
  }
  return {
    tags: form.value.tags?.length <= 50,
    login: form.value.login?.length <= 100 && form.value.login?.length > 0,
    password: form.value.type === 'LDAP' ? true : form.value.password?.length <= 100 && form.value.password?.length > 0,
  }
})

watch(() => form.value.password, () => {
  if (form.value.type === 'LDAP') form.value.password = null
})

const createAccount = () => {
  startValidating.value = true

  if (Object.values(validate.value).every(item => item)) {
    let tags = [form.value.tags]
    if (form.value.tags.includes(';')) {
      tags = form.value.tags.split(';').map((item) => item.trim())
    }

    store.accounts.push({
      ...form.value,
      id: uuidv4(),
      tags,
    })

    form.value = {
      tags: '',
      type: 'LDAP',
      login: null,
      password: null,
    }

    startValidating.value = false
    visible.value = false
  }
}
</script>

<template>
  <Button @click="visible = true" icon="pi pi-plus" size="small" outlined />

  <Dialog v-model:visible="visible" modal header="Добавить аккаунт" :style="{ width: '25rem' }">
    <form @submit.prevent="createAccount">
      <p class="mb-2">
        Метки
      </p>
      <InputText fluid v-model.trim="form.tags" />
      <Message v-if="!validate.tags" severity="error" size="small" variant="simple">
        Не более 50 символов
      </Message>

      <p class="pt-2 mb-2">
        Тип записи *
      </p>
      <Select v-model="form.type" fluid :options optionLabel="name" optionValue="key" />

      <p class="pt-2 mb-2">
        Логин *
      </p>
      <InputText fluid v-model.trim="form.login" />
      <Message v-if="!validate.login" severity="error" size="small" variant="simple">
        Не более 100 символов
      </Message>

      <div v-if="form.type === 'Local'">
        <p class="pt-2 mb-2">
          Пароль *
        </p>
        <InputText fluid v-model.trim="form.password" />
        <Message v-if="!validate.password" severity="error" size="small" variant="simple">
          Не более 100 символов
        </Message>
      </div>

      <div class="flex justify-end pt-4">
        <Button label="Сохранить" type="submit" />
      </div>
    </form>
  </Dialog>
</template>
