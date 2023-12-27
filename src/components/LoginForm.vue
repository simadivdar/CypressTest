<template>
    <div class="max-w-screen-sm p-12 mx-auto bg-gray-50 rounded-md shadow-lg">
      <form @submit.prevent="handleFormSubmit" class="flex flex-col">
        <fieldset>
          <legend class="text-3xl text-gray-800 mb-4">{{ title }}</legend>
          <InputField
            name="Email"
            type="Email"
            label="Email"
            :submitted="submitted"
            requiredMessage="Email is required"
            auto-complete="Email"
            v-model:value="email"
          ></InputField>
          <InputField
            name="password"
            type="password"
            label="Password"
            :submitted="submitted"
            requiredMessage="Password is required"
            auto-complete="current-password"
            v-model:value="password"
          ></InputField>
          <Button type="submit">Login</Button>
          <div class="text-red-500 mt-2">
            {{ errorMessage }}
          </div>
        </fieldset>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import Button from './Button.vue';
  import InputField from './InputField.vue';
  
  const props = defineProps<{
    title?: string;
    errorMessage?: string;
  }>();
  
  const emits = defineEmits<{
    (e: 'login', creds: { email: string; password: string }): void;
  }>();
  
  const title = computed(() => props.title || 'Log In');
  const email = ref('');
  const password = ref('');
  const submitted = ref(false);
  
  const handleFormSubmit = () => {
    if (email.value && password.value) {
      emits('login', { email: email.value, password: password.value });
    }
    submitted.value = true;
  };
  </script>