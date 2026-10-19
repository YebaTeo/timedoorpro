<script setup>
import { ref } from "vue";

defineProps({
  type: { type: String, required: true },
  label: { type: String, required: false },
  identity: { type: String, required: true },
  placeholder: { type: String, default: "" },
  accept: { type: String, default: "" },
  readonly: { type: String, default: "0" },
  isImage: { type: Boolean, default: false },
  modelValue: { type: [String, Number] },
});

const fileInput = ref(null);
const openFilePicker = () => fileInput.value?.click();
</script>
<template>
  <div>
    <label v-if="label" :for="identity" class="fw-semibold"
      >{{ label }} <span style="color: #cb3a31">*</span></label
    ><input
      ref="fileInput"
      :class="[{ 'd-none': isImage }, 'form-control']"
      :type="type"
      :id="identity"
      :placeholder="placeholder"
      :accept="accept"
      :readonly="readonly === '1'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="$emit('keyInput', $event.target.value)"
      @focus="$emit('totalTimeFocus', $event.target.value)"
    />
    <slot :openFilePicker="openFilePicker" />
  </div>
</template>
