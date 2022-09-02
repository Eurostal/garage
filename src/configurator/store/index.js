import { createStore } from "vuex";
import { generator } from "../Generator";

export const store = createStore({
  state() {
    return {
      garageActual: {},
      garageUpdated: {},
      defaults: {
        garage: {
          width: 2.95,
          length: 5,
          height: 1.85 + 0.13,
          walls: {
            front: {
              elements: {
                gate1: {
                  type: "gate",
                  width: 2,
                  height: 1.85,
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
          fittings: { visible: false, material: "RAL9010", fittingWidth: 0.1 },
        },
        gate: {
          wallId: 0,
          width: 2,
          height: 2,
          material: "RAL9010",
          gateType: "double",
          x: 0,
          y: 0,
        },
        window: {
          wallId: 0,
          width: 1,
          height: 1,
          material: "WHITE",
          x: 0,
          y: 1,
        },
        door: {
          wallId: 0,
          width: 1,
          height: 2,
          material: "RAL9010",
          handleSide: "left",
          x: 0,
          y: 0,
        },
        fittings: { visible: false, material: "RAL9010", fittingWidth: 0.1 },
      },
      msg: "",
    };
  },
  mutations: {
    init(state, data) {
      state.garageActual = { ...state.defaults.garage, ...data };
      state.garageUpdated = state.garageActual;
      generator.initialize(state.garageActual);
    },
    reInit(state, data) {
      state.garageUpdated = { ...state.garageActual, ...data };
      if (state.garageActual.walls.front.elements["gate2"] && state.garageUpdated.width < 5.5) {
        this.commit("remove", { type: "gate", name: "gate2", wallId: 0 });
        delete state.garageUpdated.walls.front.elements["gate2"];
      }
      const wallNames = ["front", "back", "left", "right"];
      const walls = Object.values(state.garageUpdated.walls);
      let fits = true;
      walls.forEach((wall, index) => {
        let elements = Object.values(state.garageUpdated.walls[wallNames[index]].elements);
        elements.forEach((element) => {
          const wallSize =
            index <= 1
              ? { x: state.garageUpdated.width, y: state.garageUpdated.height }
              : { x: state.garageUpdated.length, y: state.garageUpdated.height };
          if (element.type !== "gate") {
            if (element.x + element.width + 0.1 > wallSize.x || element.y + element.height + 0.1 > wallSize.y) {
              fits = false;
            }
          } else {
            let gateOffset;
            let noDoubleGate = false;
            elements.forEach((el) => {
              if (el.gateType !== "double") {
                noDoubleGate = true;
              }
            });
            gateOffset = noDoubleGate ? 0.1 : 0.0;
            state.garageUpdated.fittings.fittingWidth = noDoubleGate ? 0.1 : 0.02;
            if (element.x + element.width + gateOffset > wallSize.x || element.y + element.height > wallSize.y) {
              fits = false;
            }
          }
          if (!fits) {
            this.commit("setMsg", "Posiadasz element na ścianie, nie można zmienić jej wymiarów");
          }
        });
      });
      if (fits) {
        generator.initialize(state.garageUpdated, true);
        state.garageActual = { ...state.garageUpdated };
      }
    },

    update(state, data) {
      data = fillData(data);
      data.eventType = "update";
      updateG(state, data);
    },

    updateMaterial(state, data) {
      data.eventType = "updateMaterial";
      updateG(state, data);
    },

    remove(state, data) {
      data.eventType = "remove";
      if (data.gateType) {
        delete data.gateType;
      }
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
      return state.garageActual;
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
  if (data.wallId !== undefined && data.eventType == "update") {
    if (data.name === "gate2" && state.garageActual.width < 5.5) {
      return;
    }
    const elements = [];
    Object.values(state.garageActual.walls[wallNames[data.wallId]].elements).forEach((element) => {
      if (data.name && element.name !== data.name) {
        elements.push(element);
      }
    });
    let wallSize =
      data.wallId <= 1
        ? { x: state.garageActual.width, y: state.garageActual.height }
        : { x: state.garageActual.length, y: state.garageActual.height };
    if (data.wallId != 0 && state.garageActual.roof.roofType === "back") {
      wallSize.y = wallSize.y - 0.23;
    }
    if (checkPlacement(data, elements, wallSize)) {
      console.log("checked");

      let tempData = null;
      for (let i = 0; i < Object.keys(state.garageActual.walls).length; i++) {
        if (Object.keys(state.garageActual.walls[wallNames[i]].elements).includes(data.name)) {
          tempData = state.garageActual.walls[wallNames[i]].elements[data.name];
          delete state.garageActual.walls[wallNames[i]].elements[data.name];
        }
      }
      data = { ...tempData, ...data };
      if (data.type === "gate" && data.height) {
        if (data.type === "gate" && data.wallId != 0) {
          store.commit("setMsg", "Brama może znajdować się tylko na przedniej ścianie");
          return;
        } else {
          let garageHeight = data.height + 0.13;
          Object.values(state.garageActual.walls.front.elements).forEach((element) => {
            if (element.type == "gate" && garageHeight < element.height + 0.13) {
              garageHeight = element.height + 0.13;
            }
          });

          state.garageActual.walls.front.elements[data.name] = data;
          store.commit("reInit", { height: garageHeight });
        }
      } else {
        state.garageActual.walls[wallNames[data.wallId]].elements[data.name] = data;
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
        for (let i = 0; i < Object.keys(state.garageActual.walls).length; i++) {
          if (Object.keys(state.garageActual.walls[wallNames[i]].elements).includes(data.name)) {
            delete state.garageActual.walls[wallNames[i]].elements[data.name];
          }
        }

        console.warn("changed " + data.name + " xOffset to " + data.x);
        if (data.type === "gate" && data.height) {
          if (data.type === "gate" && data.wallId != 0) {
            store.commit("setMsg", "Brama może znajdować się tylko na przedniej ścianie");
            return;
          } else {
            let garageHeight = data.height + 0.13;
            state.garageActual.walls[wallNames[data.wallId]].elements[data.name] = data;

            store.commit("reInit", { height: garageHeight });
          }
        } else {
          state.garageActual.walls[wallNames[data.wallId]].elements[data.name] = data;
          generator.updateGarage(data.eventType, data, data.wallId);
        }
      } else {
        store.commit("setMsg", "no space on selected wall ");
      }
    }
  } else if (data.eventType === "remove") {
    if (data.type === "fittings") {
      state.garageActual.fittings.visible = false;
    } else if (data.wallId !== undefined) {
      delete state.garageActual.walls[wallNames[data.wallId]].elements[data.name];
    }

    generator.updateGarage(data.eventType, data, data.wallId);
  } else if (data.type === "roof") {
    let roofCheck = true;
    if (data.roofType) {
      if (data.roofType == "back") {
        for (let i = 0; i < Object.values(state.garageActual.walls).length; i++) {
          const elements = Object.values(state.garageActual.walls)[i].elements;
          let wallSize =
            i <= 1 ? { x: state.garageActual.width, y: state.garageActual.height } : { x: state.garageActual.length, y: state.garageActual.height };
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
        state.garageActual.roof.roofType = data.roofType;
      }
    }
    if (data.material) {
      state.garageActual.roof.material = data.material;
    } else {
      data[material] = state.garageActual.roof.material;
    }
    generator.updateGarage(data.eventType, data, data.wallId);
  } else if (data.type === "walls") {
    Object.values(state.garageActual.walls).forEach((wall) => {
      wall.material = data.material;
    });
    generator.updateGarage(data.eventType, data, data.wallId);
  } else if (data.wallId === undefined) {
    if (data.type === "fittings") {
      state.garageActual.fittings.visible = true;
      if (data.material) {
        state.garageActual.fittings.material = data.material;
      }
    }
    generator.updateGarage(data.eventType, data, data.wallId);
  }
}

function checkPlacement(item, wallElements, wallSize) {
  if (item.type !== "gate") {
    if (item.height + 0.1 > wallSize.y) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.width + 0.2 > wallSize.x) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.x + item.width + 0.1 > wallSize.x) {
      item.x = wallSize.x - 0.1 - item.width;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.x < 0.1) {
      item.x = 0.1;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.y + item.height + 0.1 > wallSize.y) {
      item.y = wallSize.y - 0.1 - item.height;
      console.warn(item.name + " exceeds wall boundary, yOffset changed to " + item.y);
    }
  } else {
    let gateOffset = 0.1;
    if (item.gateType == "double") {
      gateOffset = 0;
    }
    if (item.width + gateOffset * 2 > wallSize.x) {
      console.warn(item.name + "is too big to fit in the wall");
      return false;
    }
    if (item.x + item.width + gateOffset > wallSize.x) {
      item.x = wallSize.x - gateOffset - item.width;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
    }
    if (item.x < gateOffset) {
      item.x = gateOffset;
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
  let actualData = {};
  if (data.name && data.wallId !== undefined) {
    actualData = {
      ...store.getters.getGarage.walls[wallNames[data.wallId]].elements[data.name],
    };
  } else {
    actualData = { ...store.getters.getGarage[data.type], ...data };
  }
  filledData = {
    ...store.getters.getDefaults[data.type],
    ...actualData,
    ...data,
  };
  console.log(filledData);
  return filledData;
}
