import { createRoof } from "./roofFactory";

export default class Roof {
  constructor(roofType = "empty", width, length) {
    this.roofType = roofType;
    this.object = createRoof(this.roofType, width, length);
    this.object.name = "roof";
    return this.object;
  }
}
