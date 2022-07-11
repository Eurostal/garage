import { createStore } from "vuex";
import { generator } from "../Generator";

export const store = createStore({
  state() {
    return {
      garage: {
        width: null,
        length: null,
        height: null,
        walls: {
          front: { elements: [], material: null },
          back: { elements: [], material: null },
          right: { elements: [], material: null },
          left: { elements: [], material: null },
        },
        roof: {},
      },
    };
  },
  mutations: {
    setInit(state, data) {
      state.garage = data;
      generator.initialize(data);
    },
    update(state, data) {
      state.garage = state.garage;
      generator.updateGarage(data.eventType, data, data.wallId);
    },
    move(state, data) {},
  },
  actions: {},
});
