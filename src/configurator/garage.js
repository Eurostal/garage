import { Group, Mesh, BoxGeometry, MeshStandardMaterial, DoubleSide, Plane, Vector2, Vector3 } from "three";
import Wall from "./wall.js";
import WallCustom from "./wallCustom";
import Roof from "./roof.js";
import * as Material from "./materials";

export default class Garage {
  constructor(width = 5, length = 5, height = 2) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.walls = [];
    this.roof = new Roof("", this.width, this.length, this.height);
    this.object = this.CreateGarage();
    this.hasFittings = false;
  }

  CreateWalls() {
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        let wall = new Wall(this.width, this.height, this.length / 2, i * Math.PI);
        this.walls.push(wall);
      } else {
        let wall = new Wall(this.length, this.height, this.width / 2, i * Math.PI + Math.PI / 2);
        this.walls.push(wall);
      }
    }
  }

  CreateGarage() {
    const fundation = new Mesh(
      new BoxGeometry(this.width + 0.2, 0.1, this.length + 0.2),
      new MeshStandardMaterial({
        map: Material.concreteTexture,
      })
    ).translateY(-0.05);
    fundation.castShadow = true;
    fundation.receiveShadow = true;

    this.CreateWalls();

    const garage = new Group();
    for (let i = 0; i < this.walls.length; i++) {
      garage.add(this.walls[i].object);
    }
    garage.add(fundation);
    garage.add(this.roof.object);

    return garage;
  }

  UpdateRoof(type) {
    this.roof = new Roof(type, this.width, this.length, this.height);

    this.object.remove(this.object.getObjectByName("roof"));
    this.object.add(this.roof.object);
  }

  UpdateWall(index) {
    let previous = this.walls[index];
    this.walls[index] = new WallCustom(previous.width, previous.height, previous.offset, previous.rotation);
    this.object.remove(previous.object);
    this.object.add(this.walls[index].object);

    return this.walls[index];
  }

  addFittings() {
    let fittingTexture = Material.metalTexture.clone();
    fittingTexture.repeat.set(this.height, 0.1);

    console.log(this.roof.clippingPlane);

    const fittingMaterial = new MeshStandardMaterial({
      map: fittingTexture,
      metalness: 0.2,
      roughness: 0.3,
      emissive: 0x090909,
      flatShading: true,
      side: DoubleSide,
      clippingPlanes: [this.roof.clippingPlane],
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
    this.hasFittings = true;
  }

  get garageParts() {
    return this.object.children;
  }
}
