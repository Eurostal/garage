import { Mesh, Group, BoxGeometry } from "three";
import * as Material from "./materials";

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.rotation = rotation;
    this.object = new Group();
    this.object.add(this.createWall());
    this.material = this.updateMaterial(Material.RAL9010);
  }
  createWall() {
    let wall = new Mesh(new BoxGeometry(this.width, this.height, 0.01), this.material);
    wall.name = "wall";
    wall.position.y = this.height / 2;
    wall.rotateY(this.rotation);
    wall.translateZ(this.offset - 0.01 / 2);
    wall.castShadow = true;
    wall.receiveShadow = true;
    return wall;
  }

  updateMaterial(material) {
    const wall = this.object.getObjectByName("wall");
    const wallMaterial = material.clone();

    wallMaterial.map = material.map.clone();
    wallMaterial.normalMap = material.normalMap.clone();
    wallMaterial.roughnessMap = material.roughnessMap.clone();
    if (wallMaterial.map.rotation == 0) {
      wallMaterial.map.repeat.set(this.width, this.height); //keeping texture size fixed
      wallMaterial.normalMap.repeat.set(this.width, this.height);
      wallMaterial.roughnessMap.repeat.set(this.width, this.height);
    } else {
      wallMaterial.map.repeat.set(this.height, this.width);
      wallMaterial.normalMap.repeat.set(this.height, this.width);
      wallMaterial.roughnessMap.repeat.set(this.height, this.width);
    }
    wall.material = wallMaterial;
    return wallMaterial;
  }
}
