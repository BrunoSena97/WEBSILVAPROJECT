import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./components/charts/plugins/chart";

import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

// eslint-disable-next-line no-unused-vars
