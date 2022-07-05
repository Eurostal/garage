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
      const oldRepeat = partMaterial.map.repeat;
      let flipper = false;

      if (partMaterial.map.flipY === false) {
        flipper = true;
      }
      partMaterial.map = material.map.clone();
      flipper ? (partMaterial.map.flipY = false) : null;
      partMaterial.map.repeat = oldRepeat;

      if (material.bumpMap) {
        partMaterial.bumpMap = material.bumpMap.clone();
        partMaterial.bumpMap.repeat = oldRepeat;
        flipper ? (partMaterial.bumpMap.flipY = false) : null;
        partMaterial.bumpScale = material.bumpScale;
      }
      if (material.roughnessMap) {
        partMaterial.roughnessMap = material.roughnessMap.clone();
        partMaterial.roughnessMap.repeat = oldRepeat;

        flipper ? (partMaterial.roughnessMap.flipY = false) : null;
      }
      if (material.normalMap) {
        partMaterial.normalMap = material.normalMap.clone();
        partMaterial.normalMap.repeat = oldRepeat;
        flipper ? (partMaterial.normalMap.flipY = false) : null;
        partMaterial.normalScale = material.normalScale;
      }

      partMaterial.roughness = material.roughness;
      partMaterial.metalness = material.metalness;
      partMaterial.color = material.color;
    });
  }

  get object() {
    return this.roofCombined.roofObject;
  }

  get clippingPlane() {
    return this.roofCombined.clippingPlane;
  }
}
