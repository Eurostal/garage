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
          front: { elements: {}, material: null },
          back: { elements: {}, material: null },
          right: { elements: {}, material: null },
          left: { elements: {}, material: null },
        },
        roof: {},
      },
      garageTemp: {
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
      generator.initialize(data);
    },
    reInit(state, data) {
      Object.assign(state.garageTemp, state.garage);
      state.garageTemp.width = data.width;
      state.garageTemp.length = data.length;
      state.garageTemp.height = data.height;
      // TODO: Checker
      if (true) {
        generator.initialize(state.garageTemp, true);
        // state.garage = state.garageTemp;
      }
    },
    update(state, data) {
      const wallNames = ["front", "back", "left", "right"];
      if (data.wallId) {
        for (let i = 0; i < Object.keys(state.garage.walls).length; i++) {
          if (Object.keys(state.garage.walls[wallNames[i]].elements).includes(data.name)) {
            delete state.garage.walls[wallNames[i]].elements[data.name];
          }
        }
        state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;

        if (data.eventType === "remove") {
          delete state.garage.walls[wallNames[data.wallId]].elements[data.name];
        }
        generator.updateGarage(data.eventType, data, data.wallId);
      } else if (data.name === "roof") {
        state.garage.roof.roofType = data.roofType;
        state.garage.roof.material = data.material;
        generator.updateGarage(data.eventType, data);
      } else {
        generator.updateGarage(data.eventType, data);
      }
    },
    move(state, data) {},
  },
  actions: {},
});
