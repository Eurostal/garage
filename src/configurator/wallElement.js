export default class WallElement {
  constructor(width, height, material, name = "unnamed wall object") {
    this.width = width;
    this.height = height;
    this.material = material.clone();
    if (material.map) {
      this.material.map = material.map.clone();
      this.material.map.repeat.set(height, width);
    }
    this.name = name;
  }
}
