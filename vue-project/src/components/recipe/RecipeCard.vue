<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({ recipe: { type: Object, required: true } });
const store = useStore();
const userId = computed(() => store.state.auth.userLogin.userId);
const isLiked = computed(
  () =>
    Boolean(userId.value) &&
    Array.isArray(props.recipe.likes) &&
    props.recipe.likes.includes(userId.value),
);
const likeError = ref("");
const isSavingLike = ref(false);

const toggleLike = async () => {
  if (isSavingLike.value) return;

  isSavingLike.value = true;
  likeError.value = "";
  try {
    await store.dispatch("recipe/toggleRecipeLike", props.recipe.id);
  } catch (error) {
    console.error("Failed to update favorite recipe:", error);
    likeError.value = "Could not update favorite. Please try again.";
  } finally {
    isSavingLike.value = false;
  }
};
</script>
<template>
  <div
    class="col-12 col-lg-3 col-sm-4 position-relative"
    style="padding-top: 12px; padding-bottom: 12px"
  >
    <RouterLink
      :to="`/recipe/${recipe.id}`"
      class="card text-decoration-none"
      style="height: 398px"
    >
      <img
        :src="recipe.imageLink"
        class="card-img-top"
        :alt="recipe.name"
        height="240"
        width="285"
        style="object-fit: cover"
      />
      <div class="card-body" style="color: #0a0a0a">
        <p class="mb-0">{{ recipe.category }}</p>
        <div class="h-50">
          <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
        </div>
        <p>Recipe By {{ recipe.username }}</p>
      </div>
    </RouterLink>
    <button
      v-if="userId"
      class="recipe-card-favorite"
      type="button"
      :disabled="isSavingLike"
      :aria-label="`${isLiked ? 'Remove' : 'Add'} ${recipe.name} ${isLiked ? 'from' : 'to'} favorites`"
      :aria-pressed="isLiked"
      @click.stop="toggleLike"
    >
      <i :class="isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" />
    </button>
    <p v-if="likeError" class="text-danger small mt-1" role="alert">
      {{ likeError }}
    </p>
  </div>
</template>

<style scoped>
.recipe-card-favorite {
  position: absolute;
  top: 20px;
  right: 20px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #cb3a31;
  font-size: 1.1rem;
  box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
}

.recipe-card-favorite:focus-visible {
  outline: 3px solid var(--base-color);
  outline-offset: 2px;
}
</style>
