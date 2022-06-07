import { BoxGeometry, Mesh, MeshStandardMaterial, Group, Plane, Vector3, DoubleSide } from "three";
import * as Material from "./materials";

export default class Fittings {
  constructor(width, length, height, clippingPlane = new Plane(new Vector3(0, -1, 0), height)) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.clippingPlane = clippingPlane;
    this.object = new Group();
    this.object.name = "fittings";
    this.isVisible = false
  }

  create() {
    if (this.object.children.length == 0) {
      let fittingTexture = Material.metalTexture.clone();
      fittingTexture.repeat.set(this.height, 0.1);

      const fittingMaterial = new MeshStandardMaterial({
        map: fittingTexture,
        metalness: 0.2,
        roughness: 0.3,
        emissive: 0x090909,
        flatShading: true,
        side: DoubleSide,
        clippingPlanes: [this.clippingPlane],
        clipShadows: true,
      });
      for (let i = 0; i < 5; i++) {
        let fitting = new Mesh(new BoxGeometry(0.1, this.height + 0.5, 0.1), fittingMaterial);
        if (i < 2) {
          fitting.geometry.translate(this.width / 2 - 0.03, (this.height + 0.5) / 2, this.length / 2 - 0.03);
          fitting.rotateY(i * Math.PI);
        } else {
          fitting.geometry.translate(this.length / 2 - 0.03, (this.height + 0.5) / 2, this.width / 2 - 0.03);
          fitting.rotateY(i * Math.PI + Math.PI / 2);
        }
        this.object.add(fitting);
      }
      this.isVisible = true;
    } else {
      console.log("an instance of fittings already exists!");
    }
  }

  remove() {
    while (this.object.children.length) {
      let fitting = this.object.children[0];
      this.object.remove(fitting);
    }
    this.isVisible = false;
  }
}
