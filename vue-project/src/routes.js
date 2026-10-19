import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import { store } from "./store/index";
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import EditRecipePage from "./components/pages/EditRecipePage.vue";
const checkAuth = () => {
  const jwt = Cookies.get("jwt"),
    expires = Cookies.get("tokenExpirationDate"),
    uid = Cookies.get("UID");
  if (jwt && Date.now() < +expires) {
    store.commit("auth/setToken", { idToken: jwt, expiresIn: expires });
    store.dispatch("auth/getUser", uid);
    return true;
  }
  if (jwt) store.commit("auth/setUserLogout");
  return false;
};
export const routes = [
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    beforeEnter: () => {
      checkAuth();
      return true;
    },
  },
  { path: "/signup", name: "signup", component: SignupPage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/recipe/:id", name: "detailPage", component: DetailPage },
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    beforeEnter: (to, from, next) =>
      checkAuth() ? next() : next({ name: "login" }),
  },
  {
    path: "/new-recipe",
    name: "newRecipePage",
    component: NewRecipePage,
    beforeEnter: (to, from, next) =>
      checkAuth() ? next() : next({ name: "login" }),
  },
  {
    path: "/recipe/edit/:id",
    name: "editRecipePage",
    component: EditRecipePage,
    beforeEnter: (to, from, next) =>
      checkAuth() ? next() : next({ name: "login" }),
  },
];
export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
