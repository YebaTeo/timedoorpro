<script setup>
import RecipeCard from "./RecipeCard.vue";
defineProps({ recipes: Array });
</script>
<template>
  <div class="recipe__list-recipe row">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>
