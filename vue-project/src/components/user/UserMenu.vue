<script setup>
const emit = defineEmits(["changeComponent"]);
const menuClicked = (o) => emit("changeComponent", o);
</script>
<template>
  <div class="col-lg-3">
    <ul class="list-group">
      <li
        class="list-group-item user-menu"
        @click="menuClicked('personal-info')"
      >
        <i class="fa-solid fa-user pe-2"></i>Personal Info
      </li>
      <li
        class="list-group-item user-menu"
        @click="menuClicked('favorite-recipes')"
      >
        <i class="fas fa-heart pe-2"></i>Favorited Recipes
      </li>
      <li class="list-group-item user-menu" @click="menuClicked('user-recipe')">
        <i class="fa-solid fa-burger pe-2"></i>My Recipe
      </li>
    </ul>
  </div>
</template>
