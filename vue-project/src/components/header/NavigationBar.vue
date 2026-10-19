<script setup>
import SearchMenu from "./SearchMenu.vue";
import SignupMenu from "./SignupMenu.vue";
import ProfileMenu from "./ProfileMenu.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore(),
  menuComponent = ref("signup-menu");
const components = { "signup-menu": SignupMenu, "profile-menu": ProfileMenu };
const getToken = computed(() => store.state.auth.token);
const set = () =>
  (menuComponent.value = getToken.value ? "profile-menu" : "signup-menu");
set();
watch(getToken, set);
</script>
<template>
  <div
    class="header__navbar row justify-content-between align-items-center"
    style="width: 450px"
  >
    <SearchMenu /><component :is="components[menuComponent]" />
  </div>
</template>
