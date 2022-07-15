import { createRoof } from "./roofFactory";

export default class Roof {
  constructor(roofType, width, length, yOffset, material) {
    this.width = width;
    this.length = length;
    this.roofType = roofType;
    this.material = material;
    this.roofHeight = this.setRoofHeight();
    this.roofCombined = createRoof(roofType, width, length, yOffset, material, this.roofHeight);
    this.roofCombined.roofObject.name = "roof";
  }

  updateMaterial(material) {
    if (material) {
      this.material = material;
      this.roofCombined.roofObject.children.forEach((roofPart) => {
        const partOldRepeat = roofPart.material.map.repeat;
        const partOldRotation = roofPart.material.map.rotation;
        roofPart.material = material.clone();
        roofPart.material.map = material.map.clone();
        roofPart.material.map.rotation = partOldRotation;
        material.horizontal ? roofPart.material.map.repeat.set(1, 1) : roofPart.material.map.repeat.set(partOldRepeat.x, partOldRepeat.y);

        if (material.bumpMap) {
          roofPart.material.bumpMap = material.bumpMap.clone();
          material.horizontal ? roofPart.material.bumpMap.repeat.set(1.1) : roofPart.material.bumpMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
          roofPart.material.bumpScale = material.bumpScale;
        }
        if (material.roughnessMap) {
          roofPart.material.roughnessMap = material.roughnessMap.clone();
          material.horizontal
            ? roofPart.material.roughnessMap.repeat.set(1, 1)
            : roofPart.material.roughnessMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
        }
        if (material.normalMap) {
          roofPart.material.normalMap = material.normalMap.clone();
          material.horizontal
            ? roofPart.material.normalMap.repeat.set(1, 1)
            : roofPart.material.normalMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
          roofPart.material.normalScale = material.normalScale;
        }

        roofPart.material.roughness = material.roughness;
        roofPart.material.metalness = material.metalness;
        roofPart.material.color = material.color;
      });
    }
  }

  setRoofHeight() {
    let roofHeight = 0;
    switch (this.roofType) {
      case "gable":
        if (this.width < 5) {
          roofHeight = 0.37;
        } else if (this.width < 7) {
          roofHeight = 0.57;
        } else if (this.width < 8) {
          roofHeight = 0.67;
        } else {
          roofHeight = 0.77;
        }
        break;
      case "front":
        if (this.length < 7) {
          roofHeight = 0.23;
        } else {
          roofHeight = 0.4;
        }
        break;
      case "back":
        if (this.length < 7) {
          roofHeight = 0.23;
        } else {
          roofHeight = 0.4;
        }
        break;
      default:
        roofHeight = this.width < 5.5 ? 0.27 : 0.57;

        break;
    }
    return roofHeight;
  }

  get object() {
    return this.roofCombined.roofObject;
  }

  get clippingPlane() {
    return this.roofCombined.clippingPlane;
  }
}
