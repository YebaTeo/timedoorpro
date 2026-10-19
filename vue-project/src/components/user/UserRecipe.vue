<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserRecipeCard from "./UserRecipeCard.vue";
const store = useStore(),
  recipes = computed(() =>
    store.state.recipe.recipes.filter(
      (r) => r.userId === store.state.auth.userLogin.userId,
    ),
  );
const deleteRecipe = (id) => store.dispatch("recipe/deleteRecipe", id);
</script>
<template>
  <li class="list-group-item">
    <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
    <div class="row">
      <UserRecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :buttonName="['Delete', 'Edit']"
        @btnRemowe="deleteRecipe(recipe.id)"
        ><p>{{ new Date(recipe.createdAt).toDateString() }}</p></UserRecipeCard
      >
    </div>
  </li>
</template>
