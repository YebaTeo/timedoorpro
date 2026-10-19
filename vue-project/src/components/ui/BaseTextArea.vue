<script setup>
defineProps({
  identity: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  modelValue: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <div>
    <label :for="identity" class="fw-semibold">
      {{ label }} <span style="color: #cb3a31">*</span>
    </label>
    <textarea
      class="form-control"
      :id="identity"
      :placeholder="placeholder"
      @keyup="emit('update:modelValue', $event.target.value)"
      v-text="modelValue"
    ></textarea>
  </div>
</template>
