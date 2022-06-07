import { createRoof } from "./roofFactory";

export default class Roof {
  constructor(roofType = "empty", width, length, yOffset) {
    this.roofType = roofType;
    this.roofCombined = createRoof(this.roofType, width, length, yOffset);
    this.roofCombined.roofObject.name = "roof";
  }

  get object() {
    return this.roofCombined.roofObject;
  }

  get clippingPlane() {
    return this.roofCombined.clippingPlane;
  }
}
