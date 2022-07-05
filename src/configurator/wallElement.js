import { RAL9010 } from "./materials";

export default class WallElement {
  constructor(width, height, material, name = "unnamed wall object") {
    this.width = width;
    this.height = height;
    this.material = this.updateMaterial(material);
    this.name = name;
  }

  updateMaterial(material) {
    const newMaterial = material.clone();

    if (material.map) {
      newMaterial.map = material.map.clone();
      newMaterial.normalMap = material.normalMap.clone();
      newMaterial.roughnessMap = material.roughnessMap.clone();
      if (newMaterial.map.rotation == 0) {
        newMaterial.map.repeat.set(this.width, this.height); //keeping texture size fixed
        newMaterial.normalMap.repeat.set(this.width, this.height);
        newMaterial.roughnessMap.repeat.set(this.width, this.height);
      } else {
        newMaterial.map.repeat.set(this.height, this.width);
        newMaterial.normalMap.repeat.set(this.height, this.width);
        newMaterial.roughnessMap.repeat.set(this.height, this.width);
      }
    }
    return newMaterial;
  }
}
