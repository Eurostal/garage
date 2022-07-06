import { createRoof } from "./roofFactory";

export default class Roof {
  constructor(roofType = "empty", width, length, yOffset, material) {
    this.roofType = roofType;
    this.material = material;
    this.roofCombined = createRoof(roofType, width, length, yOffset, material);
    this.roofCombined.roofObject.name = "roof";
  }

  updateMaterial(material) {
    this.roofCombined.roofObject.children.forEach((roofPart) => {
      const partOldRepeat = roofPart.material.map.repeat;
      const partOldRotation = roofPart.material.map.rotation;
      roofPart.material = material.clone();
      roofPart.material.map = material.map.clone();
      roofPart.material.map.rotation = partOldRotation;
      material.horizontal ? roofPart.material.map.repeat.set(length, 2) : roofPart.material.map.repeat.set(partOldRepeat.x, partOldRepeat.y);

      if (material.bumpMap) {
        roofPart.material.bumpMap = material.bumpMap.clone();
        material.horizontal
          ? roofPart.material.bumpMap.repeat.set(length, 2)
          : roofPart.material.bumpMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
        roofPart.material.bumpScale = material.bumpScale;
      }
      if (material.roughnessMap) {
        roofPart.material.roughnessMap = material.roughnessMap.clone();
        material.horizontal
          ? roofPart.material.roughnessMap.repeat.set(length, 2)
          : roofPart.material.roughnessMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
      }
      if (material.normalMap) {
        roofPart.material.normalMap = material.normalMap.clone();
        material.horizontal
          ? roofPart.material.normalMap.repeat.set(length, 2)
          : roofPart.material.normalMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
        roofPart.material.normalScale = material.normalScale;
      }

      roofPart.material.roughness = material.roughness;
      roofPart.material.metalness = material.metalness;
      roofPart.material.color = material.color;
    });
  }

  get object() {
    return this.roofCombined.roofObject;
  }

  get clippingPlane() {
    return this.roofCombined.clippingPlane;
  }
}
