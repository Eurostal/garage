import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./configurator/store/index.js";

const app = createApp(App);
app.use(store);
store.dispatch("init");
app.mount("#app");
