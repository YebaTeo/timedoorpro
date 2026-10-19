<script setup>
import UserMenu from "../user/UserMenu.vue";
import FavoriteRecipe from "../user/FavoriteRecipe.vue";
import PersonalInfo from "../user/PersonalInfo.vue";
import UserRecipe from "../user/UserRecipe.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
const route = useRoute(),
  store = useStore(),
  component = {
    "personal-info": PersonalInfo,
    "favorite-recipes": FavoriteRecipe,
    "user-recipe": UserRecipe,
  },
  getRoute = computed(() => route.params.component),
  userData = computed(() => store.state.auth.userLogin);
</script>
<template>
  <div class="container-md my-5 py-5">
    <div class="d-flex align-items-center mb-4">
      <img
        :src="userData.imageLink"
        alt="Profile"
        width="36"
        height="36"
        class="rounded-circle"
        style="object-fit: cover"
      />
      <div class="ps-3">
        <p class="my-0 fs-5 fw-semibold">
          {{ userData.firstname }} {{ userData.lastname }}
        </p>
        <p class="my-0 fs-6 text-secondary">{{ userData.email }}</p>
      </div>
    </div>
    <div class="row">
      <UserMenu @changeComponent="$router.push('/user/' + $event)" />
      <div class="col-lg-9">
        <ul class="list-group">
          <component :is="component[getRoute]" />
        </ul>
      </div>
    </div>
  </div>
</template>
