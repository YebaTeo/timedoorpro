import axios from "axios";
const database = "https://recipe-vue-batch2-default-rtdb.firebaseio.com";
export default {
  namespaced: true,
  state: () => ({ recipes: [], recipeDetail: {} }),
  mutations: {
    setRecipeData(s, p) {
      s.recipes = p;
    },
    setRecipeDetail(s, p) {
      s.recipeDetail = p;
    },
    setNewRecipe(s, p) {
      s.recipes.push(p);
    },
    setRecipeLikes(s, { id, likes }) {
      const recipe = s.recipes.find((item) => item.id === id);
      if (recipe) recipe.likes = likes;
    },
  },
  actions: {
    async getRecipeData({ commit }) {
      try {
        const { data } = await axios.get(`${database}/recipes.json`);
        const arr = [];
        for (const key in data) arr.push({ id: key, ...data[key] });
        commit("setRecipeData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async getRecipeDetail({ commit }, id) {
      try {
        const { data } = await axios.get(`${database}/recipes/${id}.json`);
        commit("setRecipeDetail", data);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewRecipe({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          `${database}/recipes.json?auth=${rootState.auth.token}`,
          newData,
        );
        commit("setNewRecipe", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },
    async toggleRecipeLike({ commit, rootState, state }, id) {
      const userId = rootState.auth.userLogin.userId;
      const token = rootState.auth.token;
      const recipe = state.recipes.find((item) => item.id === id);

      if (!userId || !token) {
        throw new Error("You must be logged in to favorite recipes.");
      }
      if (!recipe) {
        throw new Error(`Recipe "${id}" was not found.`);
      }

      const currentLikes = Array.isArray(recipe.likes)
        ? recipe.likes.filter((like) => like && like !== "null")
        : [];
      const nextLikes = currentLikes.includes(userId)
        ? currentLikes.filter((like) => like !== userId)
        : [...currentLikes, userId];
      const savedLikes = nextLikes.length ? nextLikes : ["null"];

      await axios.patch(
        `${database}/recipes/${id}.json?auth=${token}`,
        { likes: savedLikes },
      );
      commit("setRecipeLikes", { id, likes: savedLikes });
    },
    async deleteRecipe({ dispatch, rootState }, id) {
      try {
        await axios.delete(
          `${database}/recipes/${id}.json?auth=${rootState.auth.token}`,
        );
        await dispatch("getRecipeData");
      } catch (err) {
        console.log(err);
      }
    },
    async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
      try {
        await axios.put(
          `${database}/recipes/${id}.json?auth=${rootState.auth.token}`,
          newRecipe,
        );
        await dispatch("getRecipeData");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
