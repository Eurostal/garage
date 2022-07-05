import WallElement from "./WallElement";
import { createGate } from "./gateFactory";

export default class Gate extends WallElement {
  constructor(width, height, material, name, gateType = "empty") {
    super(width, height, material, name);
    this.gateType = gateType;
    this.object = createGate(this.gateType, this.width, this.height, this.material);
    this.object.name = name;
    this.height = height - 0.01;
  }

  updateModel() {
    this.object = createGate(this.gateType, this.width, this.height, this.material);
  }
}
