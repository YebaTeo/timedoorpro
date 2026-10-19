import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/index";
import router from "./routes";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

createApp(App).use(store).use(router).mount("#app");
