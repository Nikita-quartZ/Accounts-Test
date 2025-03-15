<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

import TypeSelect from '@/components/shared/typeSelect.vue';

import { useAccountsStore } from '@/stores/accounts'

import type { AccountData } from '@/types/accounts'

const store = useAccountsStore()

const { account } = defineProps<{
  account: AccountData
}>()

// Variables
const isShowPassword = ref(false)

const form = ref<AccountData>({
  id: null,
  tags: '',
  type: 'LDAP',
  login: null,
  password: null,
})

// Computed
const validate = computed(() => ({
  tags: form.value.tags?.length <= 50,
  login: form.value.login?.length <= 100 && form.value.login?.length > 0,
  password: form.value.type === 'LDAP' ? true : form.value.password?.length <= 100 && form.value.password?.length > 0,
}))

// Methods
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

// Watchers
watch(() => account, () => {
  form.value = {
    ...account,
    tags: account.tags.join('; '),
  }
},
  { immediate: true })

</script>

<template>
  <tr>
    <th class="pb-2 pr-2 w-1/5">
      <InputText v-model.trim="form.tags" @blur="changeAccount()" :invalid="!(form.tags?.length <= 50)" fluid />
    </th>

    <th class="pb-2 pr-2 w-1/5">
      <TypeSelect v-model="form.type" @change="changeAccount()" />
    </th>

    <th class="pb-2 pr-2" :colspan="form.type === 'Local' ? 1 : 2">
      <InputText v-model.trim="form.login" @blur="changeAccount()"
        :invalid="!(form.login?.length <= 100 && form.login?.length > 0)" fluid />
    </th>

    <th class="pb-2 pr-2 w-1/5" v-if="form.type === 'Local'">
      <InputGroup>
        <InputText v-model.trim="form.password" @blur="changeAccount()" :type="isShowPassword ? 'text' : 'password'"
          :invalid="!(form.password?.length <= 100 && form.password?.length > 0)" fluid />
        <InputGroupAddon>
          <Button @click="isShowPassword = !isShowPassword" :icon="`pi ${isShowPassword ? 'pi-eye' : 'pi-eye-slash'}`"
            severity="secondary" variant="text" />
        </InputGroupAddon>
      </InputGroup>
    </th>

    <th class="pb-2">
      <Button @click="deleteAccount" icon="pi pi-trash" outlined />
    </th>
  </tr>
</template>
