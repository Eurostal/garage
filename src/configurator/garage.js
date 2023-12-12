import { Group, Mesh, BoxGeometry, MeshStandardMaterial, DoubleSide, Plane, Vector2, Vector3 } from "three";
import Wall from "./wall.js";
import WallCustom from "./wallCustom";
import Roof from "./roof.js";
import Fittings from "./fittings";
import * as Texture from "./textures";
import * as Material from "./materials";

export default class Garage {
  constructor(width = 5, length = 5, height = 2, material = Material.RAL9010, defaultInside = true) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.material = material;
    this.defaultInside = defaultInside;
    this.walls = [];
    this.roof = new Roof("gable", this.width, this.length, this.height, this.material, true);
    this.fittings = new Fittings(this.width, this.length, this.height, this.roof.clippingPlane);
    this.object = this._createGarage();
  }

  _createWalls() {
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        let wall = new WallCustom(
          this.width,
          this.height,
          this.length / 2,
          i * Math.PI,
          this.roof.clippingPlane,
          this.material,
          this.defaultInside,
          this.roof.roofHeight,
          i
        );
        this.walls.push(wall);
      } else {
        let wall = new WallCustom(
          this.length,
          this.height,
          this.width / 2,
          i * Math.PI + Math.PI / 2,
          this.roof.clippingPlane,
          this.material,
          this.defaultInside,
          this.roof.roofHeight,
          i
        );
        this.walls.push(wall);
      }
    }
  }

  _createGarage() {
    const fundation = new Mesh(
      new BoxGeometry(this.width + 0.2, 0.1, this.length + 0.2),
      new MeshStandardMaterial({
        map: Texture.concreteTexture,
      })
    ).translateY(-0.05);
    fundation.castShadow = true;
    fundation.receiveShadow = true;

    this._createWalls();

    const garage = new Group();
    for (let i = 0; i < this.walls.length; i++) {
      garage.add(this.walls[i].object);
    }
    garage.add(fundation);
    garage.add(this.roof.object);
    garage.add(this.fittings.object);

    console.log(this);
    return garage;
  }

  updateRoof(type) {
    this.roof = new Roof(type, this.width, this.length, type == 'back' ? this.height - 0.2 : this.height , this.roof.material, this.roof.defaultInside);
    this.object.remove(this.object.getObjectByName("roof"));
    this.object.add(this.roof.object);
    this.walls.forEach((wall) => {
      wall.updateMaterial(this.material, this.roof.clippingPlane, this.defaultInside);
    });

    this.fittings.clippingPlane = this.roof.clippingPlane;
    if (this.fittings.isVisible) {
      this.fittings.remove();
      this.fittings.create();
    }
    return this.roof;
  }

  updateWallsMaterial(material, defaultInside) {
    this.walls.forEach((wall) => {
      wall.updateMaterial(material, this.roof.clippingPlane, defaultInside);
    });

    this.material = material;
  }

  get garageParts() {
    return this.object.children;
  }

  get garageObject() {
    return this.object;
  }
}
