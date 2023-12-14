import { BoxGeometry, Mesh, Group, Plane, Vector3 } from "three";
import * as Materials from "./materials";

export default class Fittings {
  constructor(width, length, height, clippingPlane = new Plane(new Vector3(0, -1, 0), height)) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.clippingPlane = clippingPlane;
    this.object = new Group();
    this.object.name = "fittings";
    const fittingMaterial = Materials.RAL9010.clone();
    fittingMaterial.map.repeat.set(this.height, 0.05);
    fittingMaterial.clipShadows = true;
    this.material = fittingMaterial;
    this.isVisible = false;
  }

  create(fittingWidth = 0.1) {
    if (this.object.children.length == 0) {
      this.material.clippingPlanes = this.clippingPlane;
      let offset = fittingWidth/2 - 0.015
      for (let i = 0; i < 5; i++) {
        let fitting = new Mesh(new BoxGeometry(fittingWidth, this.height + 0.5, fittingWidth), this.material);
        if (i < 2) {
          fitting.geometry.translate(this.width / 2 - offset, (this.height + 0.5) / 2, this.length / 2 - offset );
          fitting.rotateY(i * Math.PI);
        } else {
          fitting.geometry.translate(this.length / 2 - offset, (this.height + 0.5) / 2, this.width / 2 - offset);
          fitting.rotateY(i * Math.PI + Math.PI / 2);
        }
        this.object.add(fitting);
      }
      this.isVisible = true;
    } else {
      console.log("an instance of fittings already exists!");
    }

    return this;
  }

  remove() {
    while (this.object.children.length) {
      let fitting = this.object.children[0];
      this.object.remove(fitting);
    }
    this.isVisible = false;
  }

  updateMaterial(material) {
    if (material !== undefined) {
      const fittingMaterial = material.clone();
      fittingMaterial.map.repeat.set(this.height, 0.1);
      fittingMaterial.clippingPlanes = this.clippingPlane;
      fittingMaterial.clipShadows = true;
      this.material = fittingMaterial;

      this.object.children.forEach((child) => {
        child.material = fittingMaterial;
      });
    }
  }
}
