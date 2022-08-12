import { parse } from "@babel/parser";
import { Mesh, Group, BoxGeometry } from "three";
import * as Material from "./materials";

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0, clippingPlane, material, roofHeight) {
    this.roofHeight = roofHeight;
    console.log(this.roofHeight);
    // debugger;
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.rotation = rotation;
    this.object = new Group();
    this.materialTemp = material;
    this.clippingPlane = clippingPlane;
    this.object.add(this.createWall());
    this.material = this.updateMaterial(material, clippingPlane);
  }
  createWall() {
    const overflowHeight = this.roofHeight;
    let wall = new Mesh(new BoxGeometry(this.width, this.height + overflowHeight, 0.01), this.material);
    wall.name = "wall";
    wall.position.y = (this.height + overflowHeight) / 2;
    wall.rotateY(this.rotation);
    wall.translateZ(this.offset - 0.01 / 2);
    wall.castShadow = true;
    wall.receiveShadow = true;
    return wall;
  }

  updateMaterial(material, clippingPlane) {
    console.log(this.roofHeight);

    if (material !== undefined) {
      const wall = this.object.getObjectByName("wall");
      const wallMaterial = material.clone();
      if (clippingPlane !== undefined) {
        wallMaterial.clippingPlanes = clippingPlane;
        this.clippingPlane = clippingPlane;
      }
      wallMaterial.map ? (wallMaterial.map = material.map.clone()) : null;
      wallMaterial.normalMap ? (wallMaterial.normalMap = material.normalMap.clone()) : null;
      wallMaterial.roughnessMap ? (wallMaterial.roughnessMap = material.roughnessMap.clone()) : null;
      wallMaterial.bumpMap ? (wallMaterial.bumpMap = material.bumpMap.clone()) : null;
      if (wallMaterial.map && material.horizontal) {
        wallMaterial.map.repeat.set(this.width, this.height + this.roofHeight);
        wallMaterial.normalMap ? wallMaterial.normalMap.repeat.set(this.width, this.height + this.roofHeight) : null;
        wallMaterial.roughnessMap ? wallMaterial.roughnessMap.repeat.set(this.width, this.height + this.roofHeight) : null;
        wallMaterial.bumpMap ? wallMaterial.bumpMap.repeat.set(this.width, this.heigh + this.roofHeight) : null;
      } else {
        wallMaterial.map ? wallMaterial.map.repeat.set(this.height, this.width) : null;
        wallMaterial.normalMap ? wallMaterial.normalMap.repeat.set(this.height, this.width) : null;
        wallMaterial.roughnessMap ? wallMaterial.roughnessMap.repeat.set(this.height, this.width) : null;
        wallMaterial.bumpMap ? wallMaterial.bumpMap.repeat.set(this.height, this.width) : null;
      }
      wall.material = wallMaterial;
      this.material = wallMaterial;
    }
  }
}
