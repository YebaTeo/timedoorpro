<script setup>
import WebHeader from "./components/header/WebHeader.vue";
import WebFooter from "./components/footer/WebFooter.vue";
</script>

<template>
  <WebHeader />
  <RouterView />
  <WebFooter />
</template>
