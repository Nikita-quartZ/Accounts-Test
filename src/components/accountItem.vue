<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import Button from "primevue/button"
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

import { useAccountsStore } from '@/stores/accounts'

const store = useAccountsStore()

interface AccountForm {
  id: string | null,
  tags: string,
  type: string,
  login: string | null,
  password: string | null,
}

const { account } = defineProps<{
  account: AccountForm
}>()

const form = ref({
  id: null,
  tags: '',
  type: 'LDAP',
  login: null,
  password: null,
})

const isShowPassword = ref(false)

watch(() => account, () => {
  form.value = {
    ...account,
    tags: account.tags.join('; '),
  }
}, { immediate: true })

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

const validate = computed(() => ({
  tags: form.value.tags?.length <= 50,
  login: form.value.login?.length <= 100 && form.value.login?.length > 0,
  password: form.value.type === 'LDAP' ? true : form.value.password?.length <= 100 && form.value.password?.length > 0,
}))

const deleteAccount = () => {
  store.accounts = store.accounts.filter((item) => item.id !== account.id)
}

const changeAccount = () => {
  if (Object.values(validate.value).every(item => item)) {
    store.accounts = store.accounts.map((item) => {
      if (!(form.value.id === item.id)) return item

      let tags = [form.value.tags]
      if (form.value.tags.includes(';')) {
        tags = form.value.tags.split(';').map((item) => item.trim())
      }

      if (form.value.type === 'LDAP') {
        return {
          ...form.value,
          password: null,
          tags,
        }
      }

      return {
        ...form.value,
        tags,
      }
    })
  }
}
</script>

<template>
  <tr>
    <th class="pb-2 pr-2 w-1/5">
      <InputText :invalid="!(form.tags?.length <= 50)" fluid v-model.trim="form.tags" @blur="changeAccount()" />
    </th>
    <th class="pb-2 pr-2 w-1/5">
      <Select v-model="form.type" fluid :options optionLabel="name" optionValue="key" @change="changeAccount()" />
    </th>
    <th class="pb-2 pr-2" :colspan="form.type === 'Local' ? 1 : 2">
      <InputText v-model.trim="form.login" :invalid="!(form.login?.length <= 100 && form.login?.length > 0)" fluid
        @blur="changeAccount()" />
    </th>
    <th class="pb-2 pr-2 w-1/5" v-if="form.type === 'Local'">
      <InputGroup>
        <InputText :type="isShowPassword ? 'text' : 'password'" v-model.trim="form.password"
          :invalid="!(form.password?.length <= 100 && form.password?.length > 0)" fluid @blur="changeAccount()" />
        <InputGroupAddon>
          <Button :icon="`pi ${isShowPassword ? 'pi-eye' : 'pi-eye-slash'}`" severity="secondary" variant="text"
            @click="isShowPassword = !isShowPassword" />
        </InputGroupAddon>
      </InputGroup>

    </th>
    <th class="pb-2">
      <Button icon="pi pi-trash" @click="deleteAccount" outlined />
    </th>
  </tr>
</template>
