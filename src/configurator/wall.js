import { Mesh, Group, BoxGeometry } from "three";
import * as Material from "./materials";

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0, clippingPlane, material, defaultInside, roofHeight) {
    this.roofHeight = roofHeight;
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.rotation = rotation;
    this.object = new Group();
    this.materialTemp = material;
    this.clippingPlane = clippingPlane;
    this.object.add(this.createWall());
    this.defaultInside = defaultInside;
    this.material = this.updateMaterial(material, clippingPlane, defaultInside);
  }

  createWall() {
    const overflowHeight = this.roofHeight;
    let geometry = new BoxGeometry(this.width, this.height + overflowHeight, 0.01);
    geometry.groups.forEach(function (face, i) {
      face.materialIndex = 0;
      if (i === 5) {
        face.materialIndex = 1;
      }
    });
    let wall = new Mesh(geometry, this.material);
    wall.name = "wall";
    wall.position.y = (this.height + overflowHeight) / 2;
    wall.rotateY(this.rotation);
    wall.translateZ(this.offset - 0.01 / 2);
    wall.castShadow = true;
    wall.receiveShadow = true;
    return wall;
  }

  updateMaterial(material, clippingPlane, defaultInside) {
    if (material !== undefined) {
      const wall = this.object.getObjectByName("wall");
      const wallBack = this.object.getObjectByName("wallBack");
      const wallMaterial = material.clone();
      const materials = [wallMaterial];

      if (defaultInside) {
        const innerWallMaterial = Material.RAL9010.clone();
        materials.push(innerWallMaterial);
        innerWallMaterial.map = innerWallMaterial.map.clone();
        innerWallMaterial.normalMap = innerWallMaterial.normalMap.clone();
        innerWallMaterial.roughnessMap = innerWallMaterial.roughnessMap.clone();

        let rotation = wallMaterial.map.clone().rotation;
        innerWallMaterial.map.repeat.set(this.height, this.width);
        innerWallMaterial.map.rotation = rotation;
        innerWallMaterial.normalMap.repeat.set(this.height, this.width);
        innerWallMaterial.normalMap.rotation = rotation;
        innerWallMaterial.roughnessMap.repeat.set(this.height, this.width);
        innerWallMaterial.roughnessMap.rotation = rotation;
      }

      if (clippingPlane !== undefined) {
        for (const materialPart of materials) {
          materialPart.clippingPlanes = clippingPlane;
        }
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
        wallMaterial.bumpMap ? wallMaterial.bumpMap.repeat.set(this.width, this.height + this.roofHeight) : null;
      } else {
        wallMaterial.map ? wallMaterial.map.repeat.set(this.height, this.width) : null;
        wallMaterial.normalMap ? wallMaterial.normalMap.repeat.set(this.height, this.width) : null;
        wallMaterial.roughnessMap ? wallMaterial.roughnessMap.repeat.set(this.height, this.width) : null;
        wallMaterial.bumpMap ? wallMaterial.bumpMap.repeat.set(this.height, this.width) : null;
      }

      wall.material = materials;
      if (wallBack) {
        wallBack.material = materials;
      }
      this.material = materials;
      this.defaultInside = defaultInside;
      return materials;
    }
  }
}
