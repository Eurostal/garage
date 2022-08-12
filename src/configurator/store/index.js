import { createStore } from "vuex";
import { generator } from "../Generator";

export const store = createStore({
  state() {
    return {
      garage: {
        width: 2.95,
        length: 5,
        height: 2.13,
        walls: {
          front: {
            elements: {
              gate1: {
                type: "gate",
                width: 2.95,
                height: 2,
                material: "RAL9010",
                name: "gate1",
                gateType: "double",
                x: 0,
                y: 0,
              },
            },
            material: "RAL9010",
          },
          back: { elements: {}, material: "RAL9010" },
          left: { elements: {}, material: "RAL9010" },
          right: { elements: {}, material: "RAL9010" },
        },
        roof: { roofType: "gable", material: "RAL9010" },
        fittings: { visible: false, material: "RAL9010" },
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
      defaults: {
        gate: {
          width: 3,
          height: 2,
          material: "RAL9010",
          gateType: "double",
          x: 0,
          y: 0,
        },
        window: {
          width: 1,
          height: 1,
          material: "RAL9010",
          gateType: "double",
          x: 0,
          y: 1,
        },
        door: {
          width: 1,
          height: 2,
          material: "RAL9010",
          gateType: "double",
          x: 0,
          y: 0,
        },
      },
      msg: "",
    };
  },
  mutations: {
    init(state, data) {
      state.garage = data;
      generator.initialize(data);
    },
    reInit(state, data) {
      Object.assign(state.garageTemp, state.garage);

      if (data.width) {
        state.garageTemp.width = data.width;
      }
      if (data.length) {
        state.garageTemp.length = data.length;
      }
      if (data.height) {
        state.garageTemp.height = data.height;
      }

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

    add(state, data) {
      data.eventType = "add";
      updateG(state, data);
    },

    update(state, data) {
      data.eventType = "update";
      updateG(state, data);
    },

    remove(state, data) {
      data.eventType = "remove";
      updateG(state, data);
    },

    setMsg(state, data) {
      state.msg = data;
      setTimeout(() => {
        state.msg = "";
      }, 3000);
    },
  },
  actions: {
    init(context, data) {
      if (!data) {
        context.commit("init", context.getters.getGarage);
      } else {
        context.commit("init", data);
      }
    },
  },
  getters: {
    getGarage(state) {
      return state.garage;
    },
    getMessage(state) {
      return state.msg;
    },
    getDefaults(state) {
      return state.defaults;
    },
  },
});

//Private
function updateG(state, data) {
  const wallNames = ["front", "back", "left", "right"];
  console.log(data);
  if (data.wallId !== undefined && data.eventType == "add") {
    const elements = Object.values(state.garage.walls[wallNames[data.wallId]].elements);
    let wallSize = data.wallId <= 1 ? { x: state.garage.width, y: state.garage.height } : { x: state.garage.length, y: state.garage.height };
    if (data.wallId != 0 && state.garage.roof.roofType === "back") {
      wallSize.y = wallSize.y - 0.23;
    }
    data = fillData(data);
    if (checkPlacement(data, elements, wallSize)) {
      console.log("checked");
      for (let i = 0; i < Object.keys(state.garage.walls).length; i++) {
        if (Object.keys(state.garage.walls[wallNames[i]].elements).includes(data.name)) {
          delete state.garage.walls[wallNames[i]].elements[data.name];
        }
      }
      if (data.type === "gate" && data.height) {
        if (data.type === "gate" && data.wallId != 0) {
          store.commit("setMsg", "Brama może znajdować się tylko na przedniej ścianie");
          return;
        } else {
          let garageHeight = data.height + 0.13;
          state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;
          store.commit("reInit", { height: garageHeight });
        }
      } else {
        state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;
        generator.updateGarage(data.eventType, data, data.wallId);
      }
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
        if (data.type === "gate" && data.height) {
          if (data.type === "gate" && data.wallId != 0) {
            store.commit("setMsg", "Brama może znajdować się tylko na przedniej ścianie");
            return;
          } else {
            let garageHeight = data.height + 0.13;
            state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;

            store.commit("reInit", { height: garageHeight });
          }
        } else {
          state.garage.walls[wallNames[data.wallId]].elements[data.name] = data;
          generator.updateGarage(data.eventType, data, data.wallId);
        }
      } else {
        store.commit("setMsg", "no space on selected wall ");
      }
    }
  } else if (data.eventType === "remove") {
    if (data.type === "fittings") {
      state.garage.fittings.visible = false;
    } else if (data.wallId !== undefined) {
      delete state.garage.walls[wallNames[data.wallId]].elements[data.name];
    }

    generator.updateGarage(data.eventType, data, data.wallId);
  } else if (data.type === "roof") {
    let roofCheck = true;
    if (data.roofType) {
      if (data.roofType == "back") {
        for (let i = 0; i < Object.values(state.garage.walls).length; i++) {
          const elements = Object.values(state.garage.walls)[i].elements;
          let wallSize = i <= 1 ? { x: state.garage.width, y: state.garage.height } : { x: state.garage.length, y: state.garage.height };
          if (i != 0) {
            wallSize.y = wallSize.y - 0.23;
          }
          const elementsArray = Object.values(elements);
          for (let j = 0; j < elementsArray.length; j++) {
            const element = elementsArray[j];
            console.log(wallSize.y, element);
            if (element.type !== "gate" && element.y + element.height + 0.2 > wallSize.y) {
              console.log("WYSTAJE");
              roofCheck = false;
              store.commit("setMsg", "Posiadasz element na ścianie, nie można zmienić dachu na niższy");
              return;
            }
          }
        }
      }
      if (roofCheck) {
        state.garage.roof.roofType = data.roofType;
      }
    }
    if (data.material) {
      state.garage.roof.material = data.material;
    } else {
      data[material] = state.garage.roof.material;
    }
    generator.updateGarage(data.eventType, data, data.wallId);
  } else if (data.type === "walls") {
    Object.values(state.garage.walls).forEach((wall) => {
      wall.material = data.material;
    });
    generator.updateGarage(data.eventType, data, data.wallId);
  } else if (data.wallId === undefined) {
    if (data.type === "fittings") {
      state.garage.fittings.visible = true;
      if (data.material) {
        state.garage.fittings.material = data.material;
      }
    }
    generator.updateGarage(data.eventType, data, data.wallId);
  }
}

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

function fillData(data) {
  const wallNames = ["front", "back", "left", "right"];
  let filledData = {};
  if (data.type) {
    let oldData = store.getters.getGarage.walls[wallNames[data.wallId]].elements[data.name];
    if (oldData) {
      filledData = oldData;
    } else {
      filledData = store.getters.getDefaults[data.type];
    }
  }
  Object.keys(data).forEach((key) => {
    filledData[key] = data[key];
  });
  console.log(filledData);
  return filledData;
}
