import createScene from "./createScene";
import createLight from "./createLight";

import Garage from "./garage.js";
import Gate from "./gate.js";
import Window from "./window.js";
import Door from "./door.js";

import { Materials } from "./materials";

class Generator {
  constructor() {
    this.scene = createScene();
    const lights = createLight();
    this.scene.add(lights);
    this.garage = {};
  }

  initialize(garage, reset) {
    if (reset) {
      this.scene.remove(this.garage.garageObject);
    }
    this.garage = new Garage(garage.width, garage.length, garage.height, Materials[garage.walls.front.material]);
    this.scene.add(this.garage.garageObject);
    Object.values(garage.walls).forEach((walls, wallIndex) => {
      Object.values(walls.elements).forEach((element) => {
        this.updateGarage("update", element, wallIndex);
      });
    });

    if (garage.roof && garage.roof.roofType) {
      this.updateGarage("update", { type: "roof", ...garage.roof });
    }
    if (garage.roof && garage.roof.material) {
      this.updateGarage("updateMaterial", { type: "roof", ...garage.roof });
    }
    if (garage.fittings && garage.fittings.visible) {
      this.updateGarage("update", { type: "fittings", ...garage.fittings });
    }
  }

  updateGarage(action, data, wallId) {
    if (action === "update") {
      switch (data.type) {
        case "gate":
          this.removeExisting(data.name);
          this.garage.walls[wallId].addElement(new Gate(data.width, data.height, Materials[data.material], data.name, data.gateType), data.x, 0);

          break;
        case "window":
          this.removeExisting(data.name);
          this.garage.walls[wallId].addElement(new Window(data.width, data.height, Materials[data.material], data.name), data.x, data.y);

          break;
        case "door":
          this.removeExisting(data.name);
          this.garage.walls[wallId].addElement(
            new Door(data.width, data.height, Materials[data.material], data.name),
            data.x,
            data.y,
            data.handleSide
          );

          break;
        case "fittings":
          if (!this.garage.fittings.visible) {
            this.garage.fittings.create().updateMaterial(Materials[data.material]);
          }

          break;
        case "roof":
          this.garage.updateRoof(data.roofType);

          break;
        default:
          break;
      }
    } else if (action === "updateMaterial") {
      switch (data.type) {
        case "roof":
          this.garage.roof.updateMaterial(Materials[data.material]);
          break;
        case "walls":
          this.garage.updateWallsMaterial(Materials[data.material]);
          break;
        case "fittings":
          this.garage.fittings.updateMaterial(Materials[data.material]);
          break;
        default:
          break;
      }
    } else if (action === "remove") {
      switch (data.type) {
        case "fittings":
          this.garage.fittings.remove();
          break;

        default:
          this.removeExisting(data.name);
          break;
      }
    }
  }

  checkExistance(name) {
    for (let i = 0; i < this.garage.walls.length; i++) {
      let wall = this.garage.walls[i];
      let exists = Object.keys(wall.elements).includes(name);
      let elementWallId = i;
      if (exists) {
        return { elementWallId, exists };
      }
    }
    return { elementWallId: undefined, exists: false };
  }

  removeExisting(name) {
    const { elementWallId, exists } = this.checkExistance(name);
    if (exists) {
      this.garage.walls[elementWallId].removeElement(name);
    }
  }

  getScene() {
    return this.scene;
  }
}

export const generator = new Generator();
