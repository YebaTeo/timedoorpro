<script setup>
import RecipeList from "../recipe/RecipeList.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore(),
  recipeListStatus = ref(false),
  recipeList = ref();
onMounted(async () => {
  await store.dispatch("recipe/getRecipeData");
  recipeListStatus.value = true;
  recipeList.value = store.state.recipe.recipes;
});
</script>
<template>
  <main class="container-md my-5 py-5">
    <div class="recipe__title text-center">
      <h2>All Recipe</h2>
      <p style="font-size: 15px">
        Find and share everyday cooking inspiration on Allrecipes. Discover
        recipes, cooks, videos, and how-tos based on the food you love and the
        friends you follow.
      </p>
    </div>
    <RecipeList v-if="recipeListStatus" :recipes="recipeList" />
  </main>
</template>
