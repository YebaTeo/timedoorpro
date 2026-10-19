<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import RecipeList from "../recipe/RecipeList.vue";

const store = useStore();
const isLoading = ref(true);
const recipes = computed(() => {
  const userId = store.state.auth.userLogin.userId;
  if (!userId) return [];

  return store.state.recipe.recipes.filter(
    (recipe) =>
      Array.isArray(recipe.likes) && recipe.likes.includes(userId),
  );
});

onMounted(async () => {
  await store.dispatch("recipe/getRecipeData");
  isLoading.value = false;
});
</script>

<template>
  <li class="list-group-item">
    <p class="fs-5 fw-semibold">Favorited Recipes</p>
    <p v-if="isLoading" class="text-secondary mb-0">Loading favorites...</p>
    <RecipeList v-else-if="recipes.length" :recipes="recipes" />
    <p v-else class="text-secondary mb-0">
      You haven’t favorited any recipes yet.
    </p>
  </li>
</template>
