<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid';

import Message from 'primevue/message';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import TypeSelect from '@/components/shared/typeSelect.vue';

import { useAccountsStore } from '@/stores/accounts'

import type { Account } from '@/types/accounts'

const store = useAccountsStore()

// Variables
const visible = ref(false)

const startValidating = ref(false)

const form = ref<Account>({
  tags: '',
  type: 'LDAP',
  login: null,
  password: null,
})

// Computed
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

// Methods
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

// Watchers
watch(() => form.value.password, () => {
  if (form.value.type === 'LDAP') form.value.password = null
})
</script>

<template>
  <Button @click="visible = true" icon="pi pi-plus" size="small" outlined />

  <Dialog v-model:visible="visible" :style="{ width: '25rem' }" header="Добавить аккаунт" modal>
    <form @submit.prevent="createAccount">
      <p class="mb-2">
        Метки
      </p>
      <InputText v-model.trim="form.tags" fluid />
      <Message v-if="!validate.tags" severity="error" size="small" variant="simple">
        Не более 50 символов
      </Message>

      <p class="pt-2 mb-2">
        Тип записи *
      </p>
      <TypeSelect v-model="form.type"></TypeSelect>

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
        <InputText v-model.trim="form.password" fluid />
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
