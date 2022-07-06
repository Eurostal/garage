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

    newMaterial.map ? (newMaterial.map = material.map.clone()) : null;
    newMaterial.normalMap ? (newMaterial.normalMap = material.normalMap.clone()) : null;
    newMaterial.roughnessMap ? (newMaterial.roughnessMap = material.roughnessMap.clone()) : null;
    newMaterial.bumpMap ? (newMaterial.bumpMap = material.bumpMap.clone()) : null;
    if (newMaterial.map && material.horizontal) {
      newMaterial.map.repeat.set(this.width, this.height);
      newMaterial.normalMap ? newMaterial.normalMap.repeat.set(this.width, this.height) : null;
      newMaterial.roughnessMap ? newMaterial.roughnessMap.repeat.set(this.width, this.height) : null;
      newMaterial.bumpMap ? newMaterial.bumpMap.repeat.set(this.width, this.height) : null;
    } else {
      newMaterial.map ? newMaterial.map.repeat.set(this.height, this.width) : null;
      newMaterial.normalMap ? newMaterial.normalMap.repeat.set(this.height, this.width) : null;
      newMaterial.roughnessMap ? newMaterial.roughnessMap.repeat.set(this.height, this.width) : null;
      newMaterial.bumpMap ? newMaterial.bumpMap.repeat.set(this.height, this.width) : null;
    }
    return newMaterial;
  }
}
