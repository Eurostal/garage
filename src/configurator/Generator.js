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
        this.updateGarage("add", wallIndex, element);
      });
    });
  }

  updateGarage(action, wallId, data) {
    //TODO: Get material from data
    if (action === "add") {
      switch (data.type) {
        case "gate":
          this.garage.walls[wallId].addElement(new Gate(data.width, data.height, Material.RAL9010, data.name, data.gateType), data.x, 0);

          break;
        case "window":
          this.garage.walls[wallId].addElement(new Window(data.width, data.height, Material.RAL9010, data.name), data.x, data.y);

          break;
        case "door":
          this.garage.walls[wallId].addElement(new Door(data.width, data.height, Material.RAL9010, data.name), data.x, 0);

          break;
        case "roof":
          break;
        case "walls":
          break;
        default:
          break;
      }
    }
  }

  drawPlaceholder(data, correct) {}

  getScene() {
    return this.scene;
  }
}

export const generator = new Generator();
