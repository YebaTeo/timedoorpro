<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore(),
  router = useRouter();
const logout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
};
</script>
<template>
  <div class="dropdown">
    <button class="btn dropdown-toggle" data-bs-toggle="dropdown">
      Profile
    </button>
    <ul class="dropdown-menu">
      <RouterLink to="/user/personal-info" class="dropdown-item"
        >My Profile</RouterLink
      ><RouterLink to="/user/favorite-recipes" class="dropdown-item"
        >Favorited Recipes</RouterLink
      ><RouterLink to="/user/user-recipe" class="dropdown-item"
        >My Recipes</RouterLink
      >
      <li><hr class="dropdown-divider" /></li>
      <li class="dropdown-item" @click="logout">Logout</li>
    </ul>
  </div>
</template>
