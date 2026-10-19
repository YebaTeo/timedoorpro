<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeDetail from "../detail/RecipeDetail.vue";
const store = useStore(),
  route = useRoute();
onMounted(() => store.dispatch("recipe/getRecipeDetail", route.params.id));
</script>
<template>
  <main>
    <div class="container-md my-5 py-5">
      <div class="row my-4">
        <div class="col-12 col-sm-2"></div>
        <RecipeDetail />
        <div class="col-12 col-sm-2"></div>
      </div>
    </div>
  </main>
</template>
