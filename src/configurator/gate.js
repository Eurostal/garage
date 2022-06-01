import WallElement from "./wallElement";
import { doubleDoor, tiltedDoor, empty } from "./gateFactory";

export default class Gate extends WallElement {
  constructor(width, height, material, name, gateType = "empty") {
    super(width, height, material, name);
    this.gateType = gateType;
    this.object = this.createGate(this.gateType);
    this.object.name = name;
    this.height = height - 0.01;
  }

  createGate(type) {
    switch (type) {
      case "double":
        return doubleDoor(this.width, this.height, this.material);
      case "tilted":
        return tiltedDoor(this.width, this.height, this.material);
      default:
        return empty(this.width, this.height, this.material);
    }
  }
}
