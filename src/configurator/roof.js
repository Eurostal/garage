import { Materials } from "./materials";
import { createRoof } from "./roofFactory";

export default class Roof {
  constructor(roofType, width, length, yOffset, material, defaultInside) {
    this.width = width;
    this.length = length;
    this.roofType = roofType;
    this.roofHeight = this.setRoofHeight();
    this.roofCombined = createRoof(roofType, width, length, yOffset, material, this.roofHeight);
    this.defaultInside = defaultInside;
    this.material = this.updateMaterial(material, defaultInside);
    this.roofCombined.roofObject.name = "roof";
  }

  updateMaterial(material, defaultInside) {
    if (material) {
      this.roofCombined.roofObject.children.forEach((roofPart) => {
        if (Array.isArray(roofPart.material)) {
          roofPart.material = roofPart.material[0];
        }
        const partOldRepeat = roofPart.material.map.repeat;
        const partOldRotation = roofPart.material.map.rotation;
        this.material = material.clone();
        this.material.map = material.map.clone();
        this.material.map.rotation = partOldRotation;
        material.horizontal ? this.material.map.repeat.set(1, 1) : this.material.map.repeat.set(partOldRepeat.x, partOldRepeat.y);

        if (material.bumpMap) {
          this.material.bumpMap = material.bumpMap.clone();
          material.horizontal ? this.material.bumpMap.repeat.set(1.1) : this.material.bumpMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
          this.material.bumpScale = material.bumpScale;
        }
        if (material.roughnessMap) {
          this.material.roughnessMap = material.roughnessMap.clone();
          material.horizontal ? this.material.roughnessMap.repeat.set(1, 1) : this.material.roughnessMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
        }
        if (material.normalMap) {
          this.material.normalMap = material.normalMap.clone();
          material.horizontal ? this.material.normalMap.repeat.set(1, 1) : this.material.normalMap.repeat.set(partOldRepeat.x, partOldRepeat.y);
          this.material.normalScale = material.normalScale;
        }

        this.material.roughness = material.roughness;
        this.material.metalness = material.metalness;
        this.material.color = material.color;

        this.material = [this.material];
        if (defaultInside) {
          const innerRoofMaterial = Materials.RAL9010.clone();
          innerRoofMaterial.map = roofPart.material.map.clone();
          innerRoofMaterial.map.rotation = partOldRotation;
          this.material.push(innerRoofMaterial);
        }
        roofPart.material = this.material;
      });

      return material;
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
