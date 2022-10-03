import { Materials } from "./materials";

export default class WallElement {
  constructor(width, height, material, defaultInside, name = "unnamed wall object") {
    this.width = width;
    this.height = height;
    this.defaultInside = defaultInside;
    this.material = this.updateMaterial(material, backMaterial, defaultInside);
    this.name = name;
  }

  updateMaterial(material, defaultInside) {
    if (material !== undefined) {
      const newMaterial = material.clone();
      newMaterial.horizontal = material.horizontal;
      newMaterial.customType = material.customType;
      const materials = [newMaterial];

      if (defaultInside) {
        const backMaterial = Materials.RAL9010.clone();
        backMaterial.horizontal = material.horizontal;

        materials.push(backMaterial);
      }

      return materials;
    }
  }
}
