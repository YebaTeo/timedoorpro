<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import BaseInput from "../ui/BaseInput.vue";
import BaseTextArea from "../ui/BaseTextArea.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseButton from "../ui/BaseButton.vue";
const props = defineProps({ isEdit: { type: Boolean, default: false } }),
  store = useStore(),
  router = useRouter(),
  route = useRoute(),
  recipeData = reactive({
    imageLink: "",
    name: "",
    description: "",
    category: "",
    prepTime: 0,
    cookTime: 0,
    totalTime: 0,
    ingredients: [],
    directions: [],
  }),
  ingredientCount = ref(1),
  directionCount = ref(1);
onMounted(() => {
  if (props.isEdit) {
    Object.assign(recipeData, store.state.recipe.recipeDetail);
    ingredientCount.value = recipeData.ingredients.length;
    directionCount.value = recipeData.directions.length;
  }
});
const addIngredient = () => ingredientCount.value++,
  addDirection = () => directionCount.value++,
  deleteIngredient = (i) => {
    recipeData.ingredients.splice(i, 1);
    ingredientCount.value--;
  },
  deleteDirection = (i) => {
    recipeData.directions.splice(i, 1);
    directionCount.value--;
  },
  totalTime = () =>
    (recipeData.totalTime =
      Number(recipeData.prepTime || 0) + Number(recipeData.cookTime || 0)),
  checkImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const r = new FileReader();
    r.readAsDataURL(file);
    r.addEventListener("load", () => (recipeData.imageLink = r.result));
  },
  cancelRecipe = () => router.push("/user/user-recipe"),
  addNewRecipe = async () => {
    if (props.isEdit)
      await store.dispatch("recipe/updateRecipe", {
        id: route.params.id,
        newRecipe: recipeData,
      });
    else await store.dispatch("recipe/addNewRecipe", recipeData);
    router.push("/user/user-recipe");
  };

watch(
  () => [recipeData.prepTime, recipeData.cookTime],
  totalTime,
);
</script>
<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewRecipe">
      <BaseInput
        type="file"
        identity="recipeImage"
        label="Photo Recipe"
        @input="checkImage"
      /><BaseInput
        type="text"
        identity="recipeTitle"
        label="Recipe Title"
        placeholder="Give your recipe a title"
        v-model="recipeData.name"
      /><BaseTextArea
        identity="recipeDescription"
        label="Description"
        placeholder="Share story behind recipe"
        v-model="recipeData.description"
      /><BaseSelect
        :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']"
        v-model="recipeData.category"
      />
      <div class="row">
        <div class="col">
          <BaseInput
            type="number"
            identity="prepTime"
            label="Prep Time"
            placeholder="0"
            v-model="recipeData.prepTime"
          />
        </div>
        <div class="col">
          <BaseInput
            type="number"
            identity="cookTime"
            label="Cook Time"
            placeholder="0"
            v-model="recipeData.cookTime"
          />
        </div>
        <div class="col">
          <BaseInput
            type="number"
            identity="totalTime"
            label="Total Time"
            placeholder="0"
            v-model="recipeData.totalTime"
            readonly="1"
            @totalTimeFocus="totalTime"
          />
        </div>
      </div>
      <p class="fw-semibold mt-3">Ingredients</p>
      <p class="text-secondary">
        Enter one ingredient per line. Include quantities and any special
        preparation.
      </p>
      <div
        v-for="count in ingredientCount"
        :key="count"
        class="row mb-2"
      >
        <div class="col-11">
          <BaseInput
            type="text"
            :identity="`ingredient-${count}`"
            placeholder="Ex: 1 cup sugar"
            v-model="recipeData.ingredients[count - 1]"
          />
        </div>
        <button
          type="button"
          v-if="ingredientCount > 1"
          class="col-1 col-form-label align-self-end border-0 bg-white text-danger"
          @click="deleteIngredient(count - 1)"
        >
          Delete
        </button>
      </div>
      <BaseButton
        type="button"
        class="new-ingredient-btn px-3 py-2"
        @clickButton="addIngredient"
        >Add More</BaseButton
      >
      <p class="fw-semibold mt-3">Directions</p>
      <p class="text-secondary">
        Explain how to make your recipe, including any temperatures and cooking
        times.
      </p>
      <div v-for="count in directionCount" :key="count" class="row mb-2">
        <div class="col-11">
          <BaseInput
            type="text"
            :identity="`direction-${count}`"
            placeholder="Describe this step"
            v-model="recipeData.directions[count - 1]"
          />
        </div>
        <button
          type="button"
          v-if="directionCount > 1"
          class="col-1 col-form-label align-self-end border-0 bg-white text-danger"
          @click="deleteDirection(count - 1)"
        >
          Delete
        </button>
      </div>
      <BaseButton
        type="button"
        class="new-ingredient-btn px-3 py-2"
        @clickButton="addDirection"
        >Add More</BaseButton
      ><BaseButton
        type="button"
        class="cancel-btn px-3 py-2 ms-1"
        @clickButton="cancelRecipe"
        >Cancel</BaseButton
      ><BaseButton class="submit-recipe-btn px-3 py-2 ms-1"
        >Submit</BaseButton
      >
    </form>
  </li>
</template>
