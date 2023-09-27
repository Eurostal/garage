import { createStore } from "vuex";
import { generator } from "../Generator";

export const store = createStore({
  state() {
    return {
      garageActual: {},
      garageUpdated: {},
      defaults: {
        garage: {
          width: 3,
          length: 5,
          height: 2,
          walls: {
            front: {
              elements: {},
              material: "RAL9010",
              defaultInside: true,
            },
            back: { elements: {}, material: "RAL9010", defaultInside: true },
            left: { elements: {}, material: "RAL9010", defaultInside: true },
            right: { elements: {}, material: "RAL9010", defaultInside: true },
          },
          roof: { roofType: "gable", material: "RAL9010", defaultInside: true },
          fittings: { visible: false, material: "RAL9010", fittingWidth: 0.1 },
        },
        gate: {
          wallId: 0,
          width: 3,
          height: 2,
          material: "RAL9010",
          defaultInside: true,
          gateType: "double",
          x: 0,
          y: 0,
          handle: false,
        },
        window: {
          wallId: 0,
          width: 0.6,
          height: 0.4,
          material: "WHITE",
          x: 0,
          y: 1.2,
        },
        door: {
          wallId: 0,
          width: 0.9,
          height: 1.85,
          material: "RAL9010",
          defaultInside: true,
          handleSide: "left",
          x: 0,
          y: 0,
        },
        fittings: { visible: false, material: "RAL9010", fittingWidth: 0.1 },
      },      msg: { eventName: false },
      alertsCnt: 0,
      alerts: {},
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
      if (state.garageActual.walls.front.elements["gate2"] && state.garageUpdated.width < 6) {
        this.commit("remove", { type: "gate", name: "gate2", wallId: 0 });
        delete state.garageUpdated.walls.front.elements["gate2"];
      }
      const wallNames = ["front", "back", "left", "right"];
      const walls = Object.values(state.garageUpdated.walls);
      let fits = true;
      walls.forEach((wall, index) => {
        let elements = Object.values(state.garageUpdated.walls[wallNames[index]].elements);
        elements.forEach((element) => {
          var wallSize =
            index <= 1
              ? { x: state.garageUpdated.width, y: state.garageUpdated.height }
              : { x: state.garageUpdated.length, y: state.garageUpdated.height };
          validateDoor(element, state.garageUpdated);
          if (element.type !== "gate") {
            if (index != 0 && state.garageUpdated.roof.roofType === "back") {
              wallSize.y = wallSize.y - 0.2;
            }
            if (roundTwoDec(element.x + element.width + 0.1) > wallSize.x || roundTwoDec(element.y + element.height + 0.05) > wallSize.y) {
              fits = false;
            }
          } else {
            let noTiltedGate = true;
            elements.forEach((el) => {
              if (el.gateType === "tilted" || el.gateType === "wide") {
                noTiltedGate = false;
              }
            });
            state.garageUpdated.fittings.fittingWidth = noTiltedGate ? 0.02 : 0.1;
            if (element.x + element.width > wallSize.x || element.y + element.height > wallSize.y) {
              fits = false;
            }
          }
          if (!fits) {
            if (data.roof) {
              this.commit("setMsg", { eventName: "reInitFailed", value: {reason:'roofChange', before: state.garageUpdated, after: state.garageActual } });
            } else {
              this.commit("setMsg", { eventName: "reInitFailed", value: {reason:'sizeChange', before: state.garageUpdated, after: state.garageActual } });
            }
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
    },

    setAlert(state, data) {
      if(state.alertsCnt > 1){
        this.commit("clearAllAlert", state.alertsCnt);
      }
      let id = state.alertsCnt;
      state.alerts[id] = { text: data, id: id };
      state.alertsCnt += 1;
    },

    clearAllAlert(state, index) {
      for(let i = 0; i<index; i++){
        this.commit("clearAlert", i);
      }
    },

    clearAlert(state, index) {
      delete state.alerts[index];
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
    getAlerts(state) {
      return state.alerts;
    },
    getDefaults(state) {
      return state.defaults;
    },
  },
});

//Private
function updateG(state, data) {
  const wallNames = ["front", "back", "left", "right"];
  let tempElement = null;
  console.log(data);

  if (data.wallId !== undefined && data.eventType == "update") {
    validateDoor(data, state.garageActual);

    if (data.name === "gate2" && state.garageActual.width < 6) {
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
      wallSize.y = wallSize.y - 0.2;
    }

    if (checkPlacement(data, elements, wallSize)) {
      console.log("checked");
      for (let i = 0; i < Object.keys(state.garageActual.walls).length; i++) {
        if (Object.keys(state.garageActual.walls[wallNames[i]].elements).includes(data.name)) {
          tempElement = state.garageActual.walls[wallNames[i]].elements[data.name];
          delete state.garageActual.walls[wallNames[i]].elements[data.name];
        }
      }
      if (data.type === "gate" && data.height) {
        validateGate(data, tempElement, state);
      } else {
        state.garageActual.walls[wallNames[data.wallId]].elements[data.name] = data;
        generator.updateGarage(data.eventType, data, data.wallId);
      }
    } else {
      let fits = false;
      let xBefore = data.x;
      data.x = 0;
      if (checkPlacement(data, elements, wallSize)) {
        fits = true;
      } else {
        elements.forEach((element, index) => {
          if (!fits) {
            xBefore = data.x;
            let shift = 0.2;
            if (data.type === "gate" && element.type === "gate") {
              shift = 0;
            }
            data.x = roundTwoDec(element.x + element.width + shift);
            if (checkPlacement(data, elements, wallSize)) {
              fits = true;
            }
          }
        });
      }

      if (fits) {
        for (let i = 0; i < Object.keys(state.garageActual.walls).length; i++) {
          if (Object.keys(state.garageActual.walls[wallNames[i]].elements).includes(data.name)) {
            tempElement = state.garageActual.walls[wallNames[i]].elements[data.name];
            delete state.garageActual.walls[wallNames[i]].elements[data.name];
          }
        }

        console.warn("changed " + data.name + " xOffset to " + data.x);
        store.commit("setMsg", { item: data.name, eventName: "xOffsetChange", value: { before: xBefore, after: parseFloat(data.x.toFixed(2)) } });

        if (data.type === "gate" && data.height) {
          validateGate(data, tempElement, state);
        } else {
          state.garageActual.walls[wallNames[data.wallId]].elements[data.name] = data;
          generator.updateGarage(data.eventType, data, data.wallId);
        }
      } else {
        store.commit("setMsg", { item: data.name, eventName: "noSpaceWall", value: {wallId: data.wallId} });
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
    store.commit("reInit", { roof: { ...state.garageActual.roof, ...data } });
  } else if (data.type === "walls") {
    Object.values(state.garageActual.walls).forEach((wall) => {
      wall.material = data.material;
      wall.defaultInside = data.defaultInside;
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

  if (data.eventType === "remove") {
    let garageWalls = state.garageActual.walls;
    let hasEnternance = false;
    for (const wall in garageWalls) {
      let elements = Object.values(garageWalls[wall].elements);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.type == "gate" || element.type == "door") {
          hasEnternance = true;
        }
      }
    }
    if (!hasEnternance) {
      store.commit("setAlert", "Chybí vstup do garáže, přidejte bránu nebo dveře.");
    }
  }
}

function checkPlacement(item, wallElements, wallSize) {
  wallSize.y = roundTwoDec(wallSize.y);
  wallSize.x = roundTwoDec(wallSize.x);
  item.height = roundTwoDec(item.height);
  item.width = roundTwoDec(item.width);
  item.x = roundTwoDec(item.x);
  item.y = roundTwoDec(item.y);

  let xBefore = 0;
  let yBefore = 0;

  if (item.type !== "gate") {
    if (roundTwoDec(item.height + 0.05) > wallSize.y) {
      console.warn(item.name + "is too big to fit in the wall");
      store.commit("setMsg", { item: item.name, eventName: "OversizeY" });
      return false;
    }
    if (roundTwoDec(item.width + 0.2) > wallSize.x) {
      console.warn(item.name + "is too big to fit in the wall");
      store.commit("setMsg", { item: item.name, eventName: "OversizeX" });
      return false;
    }
    if (roundTwoDec(item.x + item.width + 0.1) > wallSize.x) {
      xBefore = item.x;
      item.x = roundTwoDec(wallSize.x - 0.1 - item.width);
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
      store.commit("setMsg", { item: item.name, eventName: "xOffsetChange", value: { before: xBefore, after: parseFloat(item.x.toFixed(2)) } });
    }
    if (item.x < 0.1) {
      xBefore = item.x;
      item.x = 0.1;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
      store.commit("setMsg", { item: item.name, eventName: "xOffsetChange", value: { before: xBefore, after: parseFloat(item.x.toFixed(2)) } });
    }
    if (roundTwoDec(item.y + item.height + 0.05) > wallSize.y) {
      yBefore = item.y;
      item.y = roundTwoDec(wallSize.y - 0.05 - item.height);
      console.warn(item.name + " exceeds wall boundary, yOffset changed to " + item.y);
      store.commit("setMsg", { item: item.name, eventName: "yOffsetChange", value: { before: yBefore, after: parseFloat(item.y.toFixed(2)) } });
    }
  } else {
    if (item.width > wallSize.x) {
      console.warn(item.name + "is too big to fit in the wall");
      store.commit("setMsg", { item: item.name, eventName: "OversizeY" });

      return false;
    }
    if (item.x + item.width > wallSize.x) {
      xBefore = item.x;
      item.x = wallSize.x - item.width;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
      store.commit("setMsg", { item: item.name, eventName: "xOffsetChange", value: { before: xBefore, after: parseFloat(item.x.toFixed(2)) } });
    }
    if (item.x < 0) {
      xBefore = item.x;
      item.x = 0;
      console.warn(item.name + " exceeds wall boundary, xOffset changed to " + item.x);
      store.commit("setMsg", { item: item.name, eventName: "xOffsetChange", value: { before: xBefore, after: parseFloat(item.x.toFixed(2)) } });
    }
    if (item.y + item.height > wallSize.y) {
      yBefore = item.y;
      item.y = wallSize.y - item.height;
      console.warn(item.name + " exceeds wall boundary, yOffset changed to " + item.y);
      store.commit("setMsg", { item: item.name, eventName: "yOffsetChange", value: { before: yBefore, after: parseFloat(item.x.toFixed(2)) } });
    }
  }
  const itemPoints = [
    { x: item.x, y: item.y },
    { x: roundTwoDec(item.x + item.width), y: item.y },
    { x: item.x, y: roundTwoDec(item.y + item.height) },
    { x: roundTwoDec(item.x + item.width), y: roundTwoDec(item.y + item.height) },
  ];
  let elementPoints = [];
  for (let i = 0; i < wallElements.length; i++) {
    let element = wallElements[i];

    if (element.name !== item.name) {
      if (element.width == item.width && element.x == item.x) {
        console.warn("error, elements lay on each other, checking: " + element.name);
        return false;
      }
      elementPoints = [
        { x: element.x, y: element.y },
        { x: roundTwoDec(element.x + element.width), y: element.y },
        { x: element.x, y: roundTwoDec(element.y + element.height) },
        { x: roundTwoDec(element.x + element.width), y: roundTwoDec(element.y + element.height) },
      ];
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
  if (element.type == "gate") {
    return roundTwoDec(rect.x) < x && x < roundTwoDec(rect.x + rect.width);
  } else {
    return (
      roundTwoDec(rect.x - 0.2) < x &&
      x < roundTwoDec(rect.x + rect.width + 0.2) &&
      roundTwoDec(rect.y - 0.2) < y &&
      y < roundTwoDec(rect.y + rect.height + 0.2)
    );
  }
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

function validateGate(data, tempElement, state) {
  if (data.type === "gate" && data.wallId != 0) {
    console.warn("Gate can be placed on front wall only");
    return;
  } else {
    let garageHeight = data.height;
    Object.values(state.garageActual.walls.front.elements).forEach((element) => {
      if (element.type == "gate" && garageHeight < element.height) {
        garageHeight = element.height;
      }
    });

    if (tempElement?.height != undefined && data.height == tempElement.height) {
      state.garageActual.walls.front.elements[data.name] = data;

      let wallElements = Object.values(state.garageActual.walls.front.elements);
      let noTiltedGate = true;
      wallElements.forEach((el) => {
        if (el.gateType === "tilted" || el.gateType === "wide") {
          noTiltedGate = false;
        }
      });
      let newWidth = noTiltedGate ? 0.02 : 0.1;
      state.garageUpdated.fittings.fittingWidth = newWidth;
      if (state.garageUpdated.fittings.visible) {
        generator.updateGarage("remove", { type: "fittings" });
        generator.updateGarage("update", { type: "fittings", ...state.garageUpdated.fittings }, 0);
      }

      generator.updateGarage(data.eventType, data, 0);
    } else {
      state.garageActual.walls.front.elements[data.name] = data;
      store.commit("reInit", { height: roundTwoDec(garageHeight) });
    }
  }
}

function validateDoor(data, garage) {
  if (data.type == "door" && garage.height >= 2.25 && garage.roof.roofType == "back") {
    data.height = 2;
  } else if (data.type == "door" && garage.height >= 2.15 && garage.roof.roofType !== "back") {
    data.height = 2;
  } else if (data.type == "door") {
    data.height = 1.85;
  }
}

function roundTwoDec(value) {
  return Math.round(value * 100) / 100;
}
