import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.js";

import store from "./store/store.js";
const app = createApp(App);

app.use(router);
app.use(bootstrap);
app.use(store);
app.mount("#app");
