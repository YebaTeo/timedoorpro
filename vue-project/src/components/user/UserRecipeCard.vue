<script setup>
defineProps({
  recipe: { type: Object, required: true },
  buttonName: { type: Array, required: true },
});
</script>
<template>
  <div class="col-12 col-md-6 mb-3">
    <div class="card p-3">
      <div class="d-flex justify-content-between">
        <div>
          <p class="mb-0">{{ recipe.category }}</p>
          <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
          <slot />
        </div>
        <img
          :src="recipe.imageLink"
          :alt="recipe.name"
          width="90"
          height="80"
          class="rounded"
          style="object-fit: cover"
        />
      </div>
      <div class="d-flex justify-content-between mt-3 pt-3 border-top">
        <button class="btn delete-btn" @click="$emit('btnRemowe')">
          {{ buttonName[0] }}</button
        ><RouterLink class="btn edit-btn" :to="`/recipe/edit/${recipe.id}`">{{
          buttonName[1]
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>
