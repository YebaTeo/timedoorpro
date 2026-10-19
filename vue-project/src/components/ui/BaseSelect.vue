<script setup>
defineProps({
  data: { type: Array, required: true },
  id: { type: String, default: "category" },
  modelValue: { type: [String, Number] },
});
</script>
<template>
  <select class="form-select" :id="id" @input="$emit('update:modelValue', $event.target.value)">
    <option v-for="(item, index) in data" :key="index" :value="item" :selected="modelValue === item">
      {{ item }}
    </option>
  </select>
</template>
