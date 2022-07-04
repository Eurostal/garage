import { createRoof } from "./roofFactory";

export default class Roof {
  constructor(roofType = "empty", width, length, yOffset) {
    this.roofType = roofType;
    this.roofCombined = createRoof(this.roofType, width, length, yOffset);
    this.roofCombined.roofObject.name = "roof";
  }

  updateMaterial(material) {
    this.roofCombined.roofObject.children.forEach((roofPart) => {
      const partMaterial = roofPart.material;
      partMaterial.color = material.color;
      partMaterial.metalness = material.metalness;
      partMaterial.roughness = material.roughness;
      if (material.roughnessMap) {
        partMaterial.roughnessMap = material.roughnessMap.clone();
        if (partMaterial.map.flipY === false) {
          partMaterial.roughnessMap.flipY = false;
        }
      }
    });
  }

  get object() {
    return this.roofCombined.roofObject;
  }

  get clippingPlane() {
    return this.roofCombined.clippingPlane;
  }
}
