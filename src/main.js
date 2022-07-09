import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./configurator/store/index.js";

const app = createApp(App);
app.use(store);
store.commit("setInit", {
  width: 2.95,
  length: 5,
  height: 2,
  walls: {
    front: {
      elements: [{ type: "gate", width: 2.95, height: 2, material: "RAL9010", name: "gate1", gateType: "double", x: 0, y: 0 }],
      material: "RAL9010",
    },
    back: { elements: [], material: "RAL9010" },
    left: { elements: [], material: "RAL9010" },
    right: { elements: [], material: "RAL9010" },
  },
  roof: { type: "gable", material: "RAL9010" },
});
app.mount("#app");
