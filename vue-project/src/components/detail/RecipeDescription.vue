<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore(),
  recipeDetail = computed(() => store.state.recipe.recipeDetail);
</script>
<template>
  <div class="my-2 p-4 border rounded">
    <h2>{{ recipeDetail.name }}</h2>
    <p>{{ recipeDetail.description }}</p>
    <img
      :src="recipeDetail.imageLink"
      :alt="recipeDetail.name"
      class="img-fluid"
    />
  </div>
</template>
