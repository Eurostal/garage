import { createApp } from "vue";
import App from "./App.vue";
import { createStore } from "./configurator/store/index.js";
import translationPlugin from "./plugins/translate.js";

const app = createApp(App);
app.use(translationPlugin)
const store = createStore(app)
store.dispatch("init");
app.use(store);

app.mount("#app");

