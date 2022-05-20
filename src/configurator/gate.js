import WallElement from "./wallElement";
import * as gateModel from "./gateFactory";

export default class Gate extends WallElement {
  constructor(width, height, material, name, gateType = "empty") {
    super(width, height, material, name);
    this.gateType = gateType;
    this.object = this.createGate(this.gateType);
    this.object.name = this.name;
  }

  createGate(type) {
    switch (type) {
      case "double":
        return gateModel.doubleDoor(this.width, this.height, this.material);
      default:
        return gateModel.empty(this.width, this.height, this.material);
    }
  }
}
