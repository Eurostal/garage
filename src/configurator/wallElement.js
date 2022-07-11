export default class WallElement {
  constructor(width, height, material, name = "unnamed wall object") {
    this.width = width;
    this.height = height;
    this.material = this.updateMaterial(material);
    this.name = name;
  }

  updateMaterial(material) {
    const newMaterial = material.clone();
    newMaterial.horizontal = material.horizontal;
    newMaterial.customType = material.customType;
    return newMaterial;
  }
}
