import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./configurator/store/index.js";
import translationPlugin from "./plugins/translate.js";

export const app = createApp(App);

app.use(translationPlugin)

app.use(store);
store.dispatch("init");

app.mount("#app");

