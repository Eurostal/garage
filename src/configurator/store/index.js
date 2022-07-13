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
      msg: "",
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

      const wallNames = ["front", "back", "left", "right"];
      const walls = Object.values(state.garageTemp.walls);
      let fits = true;
      walls.forEach((wall, index) => {
        let elements = Object.values(state.garageTemp.walls[wallNames[index]].elements);
        elements.forEach((element) => {
          const wallSize =
            index <= 1 ? { x: state.garageTemp.width, y: state.garageTemp.height } : { x: state.garageTemp.length, y: state.garageTemp.height };
          if (element.type !== "gate") {
            if (element.x + element.width + 0.2 > wallSize.x || element.y + element.height + 0.2 > wallSize.y) {
              fits = false;
            }
          } else {
            if (element.x + element.width > wallSize.x || element.y + element.height > wallSize.y) {
              fits = false;
            }
          }
          if (!fits) {
            this.commit("setMsg", "Posiadasz element na ścianie, nie można zmienić jej wymiarów");
          }
        });
      });
      if (fits) {
        generator.initialize(state.garageTemp, true);
        Object.assign(state.garage, state.garageTemp);
      }
    },

    update(state, data) {
      const wallNames = ["front", "back", "left", "right"];
      console.log(data);
      if (data.wallId && data.eventType == "add") {
        const elements = Object.values(state.garage.walls[wallNames[data.wallId]].elements);
        const wallSize = data.wallId <= 1 ? { x: state.garage.width, y: state.garage.height } : { x: state.garage.length, y: state.garage.height };
        if (checkPlacement(data, elements, wallSize)) {
          for (let i = 0; i < Object.keys(state.garage.walls).length; i++) {
            if (Object.keys(state.garage.walls[wallNames[i]].elements).includes(data.name)) {
              delete state.garage.walls[wallNames[i]].elements[data.name];
            }
          }
          state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;
          generator.updateGarage(data.eventType, data, data.wallId);
        } else {
          let fits = false;
          data.x = 0;
          if (checkPlacement(data, elements, wallSize)) {
            fits = true;
          } else {
            elements.forEach((element, index) => {
              if (!fits) {
                console.log(data.x, element.width + 0.2);
                data.x = element.x + element.width + 0.2;
                if (checkPlacement(data, elements, wallSize)) {
                  fits = true;
                }
              }
            });
          }

          if (fits) {
            for (let i = 0; i < Object.keys(state.garage.walls).length; i++) {
              if (Object.keys(state.garage.walls[wallNames[i]].elements).includes(data.name)) {
                delete state.garage.walls[wallNames[i]].elements[data.name];
              }
            }

            console.warn("changed " + data.name + " xOffset to " + data.x);
            state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;
            generator.updateGarage(data.eventType, data, data.wallId);
          } else {
            let msg = "no space on selected wall ";
            this.commit("setMsg", msg);
          }
        }
      } else if (data.eventType === "remove" && data.wallId) {
        delete state.garage.walls[wallNames[data.wallId]].elements[data.name];
        generator.updateGarage(data.eventType, data, data.wallId);
      } else if (data.type === "roof") {
        if (data.roofType) {
          state.garage.roof.roofType = data.roofType;
        }
        if (data.material) {
          state.garage.roof.material = data.material;
        } else {
          data[material] = state.garage.roof.material;
        }
        generator.updateGarage(data.eventType, data);
      } else if (data.type === "walls") {
        Object.values(state.garage.walls).forEach((wall) => {
          wall.material = data.material;
        });
        generator.updateGarage(data.eventType, data);
      } else if (!data.wallId) {
        generator.updateGarage(data.eventType, data);
      }
    },
    move(state, data) {},
    setMsg(state, data) {
      state.msg = data;
      setTimeout(() => {
        state.msg = "";
      }, 3000);
    },
  },
  actions: {},
  getters: {
    getMessage(state) {
      return state.msg;
    },
  },
});

function checkPlacement(item, wallElements, wallSize) {
  if (item.type !== "gate") {
    if (item.height + 0.2 > wallSize.y) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.width + 0.4 > wallSize.x) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.x + item.width + 0.2 > wallSize.x) {
      item.x = wallSize.x - 0.2 - item.width;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.x < 0.2) {
      item.x = 0.2;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.y + item.height + 0.2 > wallSize.y) {
      item.y = wallSize.y - 0.2 - item.height;
      console.warn(item.name + " exceeds wall boundary, yOffset changed to " + item.y);
    }
  } else {
    if (item.height > wallSize.y) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.width > wallSize.x) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.x + item.width > wallSize.x) {
      item.x = wallSize.x - item.width;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.x < 0) {
      item.x = 0;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.y + item.height > wallSize.y) {
      item.y = wallSize.y - item.height;
      console.warn(item.name + " exceeds wall boundary, yOffset changed to " + item.y);
    }
  }
  const itemPoints = [
    { x: item.x, y: item.y },
    { x: item.x + item.width, y: item.y },
    { x: item.x, y: item.x + item.height },
    { x: item.x + item.width, y: item.y + item.height },
  ];
  let elementPoints = [];
  for (let i = 0; i < wallElements.length; i++) {
    let element = wallElements[i];

    if (element.name !== item.name) {
      elementPoints = [
        { x: element.x, y: element.y },
        { x: element.x + element.width, y: element.y },
        { x: element.x, y: element.x + element.height },
        { x: element.x + element.width, y: element.y + element.height },
      ];
    }
    if (element.name !== item.name) {
      for (let j = 0; j < itemPoints.length; j++) {
        let point = itemPoints[j];
        if (contains(element, point)) {
          console.warn("error, point contained in " + element.name);
          return false;
        }
      }
      for (let j = 0; j < elementPoints.length; j++) {
        let elPoint = elementPoints[j];
        if (contains(item, elPoint)) {
          console.warn("error, point contained in " + item.name);
          return false;
        }
      }
    }
  }
  return true;
}

function contains(element, { x, y }) {
  const rect = {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
  };
  return rect.x - 0.2 < x && x < rect.x + rect.width + 0.2 && rect.y - 0.2 < y && y < rect.y + rect.height + 0.2;
}