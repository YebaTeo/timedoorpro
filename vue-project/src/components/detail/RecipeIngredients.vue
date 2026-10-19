<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore(),
  recipeDetail = computed(() => store.state.recipe.recipeDetail);
</script>
<template>
  <div class="my-3 card">
    <div class="card-header">
      <p class="fs-4 my-0 fw-semibold">Ingredients</p>
    </div>
    <div class="card-body">
      <ul class="mb-0">
        <li
          v-for="(ingredient, index) in recipeDetail.ingredients"
          :key="index"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>
  </div>
</template>
