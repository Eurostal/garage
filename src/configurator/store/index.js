import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      garage: {
        width: null,
        length: null,
        height: null,
        walls: {
          front: { elements: {}, material: null },
          back: { elements: {}, material: null },
          right: { elements: {}, material: null },
          left: { elements: {}, material: null },
        },
        roof: {},
      },
    };
  },
  mutations: {
    setInit(state, data) {
      state.garage = data;
    },
  },
  actions: {},
});
