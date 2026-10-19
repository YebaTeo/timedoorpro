<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import RecipeForm from "../recipeForm/RecipeForm.vue";
const store = useStore(),
  route = useRoute(),
  detailData = ref(),
  isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  await store.dispatch("recipe/getRecipeDetail", route.params.id);
  detailData.value = store.state.recipe.recipeDetail;
  isLoading.value = false;
});
</script>
<template>
  <main>
    <div class="container-md my-5 py-5">
      <RecipeForm v-if="detailData && !isLoading" :isEdit="true" />
    </div>
  </main>
</template>
