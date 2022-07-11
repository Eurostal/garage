import createScene from "./createScene";
import createLight from "./createLight";

import Garage from "./Garage.js";
import Gate from "./Gate.js";
import Window from "./Window.js";
import Door from "./Door.js";

import * as Material from "./materials";

class Generator {
  constructor() {
    this.scene = createScene();
    const lights = createLight();
    this.scene.add(lights);
    this.garage = {};
  }

  initialize(garage) {
    this.garage = new Garage(garage.width, garage.length, garage.height);
    this.scene.add(this.garage.garageObject);
    Object.values(garage.walls).forEach((walls, wallIndex) => {
      Object.values(walls.elements).forEach((element) => {
        this.updateGarage("add", element, wallIndex);
      });
    });
    if (garage.roof && garage.roof.roofType) {
      this.updateGarage("update", { type: "roof", ...garage.roof });
    }
    if (garage.fittings && garage.fittings.visible) {
      this.updateGarage("add", { type: "fittings", ...garage.fittings });
    }
  }

  updateGarage(action, data, wallId) {
    //TODO: Get material from data
    if (action === "add") {
      switch (data.type) {
        case "gate":
          this.removeExisting(data.name);
          this.garage.walls[wallId].addElement(new Gate(data.width, data.height, Material.RAL9010, data.name, data.gateType), data.x, 0);

          break;
        case "window":
          this.removeExisting(data.name);
          this.garage.walls[wallId].addElement(new Window(data.width, data.height, Material.RAL9010, data.name), data.x, data.y);

          break;
        case "door":
          this.removeExisting(data.name);
          this.garage.walls[wallId].addElement(new Door(data.width, data.height, Material.RAL9010, data.name), data.x, 0);

          break;
        case "fittings":
          this.garage.fittings.create().updateMaterial(Material.RAL9010);
          break;
        default:
          break;
      }
    } else if (action === "update") {
      switch (data.type) {
        case "roof":
          this.garage.updateRoof(data.roofType).updateMaterial(Material.RAL9010);
          break;
        case "walls":
          this.garage.walls.forEach((wall) => {
            wall.updateMaterial(Material.RAL9010);
          });
          break;
        case "fittings":
          this.garage.fittings.create().updateMaterial(Material.RAL9010);
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

  drawPlaceholder(data, correct) {}

  getScene() {
    return this.scene;
  }
}

export const generator = new Generator();
