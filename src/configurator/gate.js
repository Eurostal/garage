import WallElement from "./wallElement";
import { createGate } from "./gateFactory";

export default class Gate extends WallElement {
  constructor(width, height, material, defaultInside, name, gateType = "empty") {
    super(width, height, material, defaultInside, name);
    this.gateType = gateType;
    this.object = createGate(this.gateType, this.width, this.height, this.material[0]); //Temporarly passing one materail, will change to an array
    this.object.name = name;
    this.height = height - 0.01;
  }

  updateModel() {
    this.object = createGate(this.gateType, this.width, this.height, this.material[0]);
  }
}
