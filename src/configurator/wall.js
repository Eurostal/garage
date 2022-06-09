import { Mesh, MeshStandardMaterial, BoxGeometry, DoubleSide } from "three";
import * as Texture from "./textures";
import * as Material from "./materials";

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.rotation = rotation;

    const wallMaterial = Material.RAL9010.clone();
    wallMaterial.map = wallMaterial.map.clone();
    wallMaterial.map.repeat.set(height, width); //keeping texture size fixed

    this.material = wallMaterial;

    this.object = this.createWall();
  }
  createWall() {
    let wall = new Mesh(new BoxGeometry(this.width, this.height, 0.01), this.material);
    wall.name = "WallBase";
    wall.position.y = this.height / 2;
    wall.rotateY(this.rotation);
    wall.translateZ(this.offset - 0.01 / 2);
    wall.castShadow = true;
    wall.receiveShadow = true;
    return wall;
  }
}
