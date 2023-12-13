import WallElement from "./wallElement";
import { MeshStandardMaterial, MeshBasicMaterial, PlaneGeometry, Mesh, Group, BoxGeometry, MultiplyOperation, DoubleSide } from "three";

export default class Door extends WallElement {
  constructor(width, height, material, defaultInside, name, handleSide) {
    super(width, height, material, defaultInside, name);
    this.handleSide = handleSide;
    const handle = new Group();
    const handlePart = new Mesh(
      new BoxGeometry(0.02, 0.1, 0.01),
      new MeshStandardMaterial({
        color: 0x000000,
      })
    );
    handlePart.position.z = 0.01;

    const handlePart2 = handlePart.clone();
    handlePart2.rotateZ(Math.PI / 2);
    handlePart2.position.z = 0.02;
    handlePart2.position.x = 0.05;
    handle.add(handlePart, handlePart2);
    if (this.handleSide == "right") {
      handle.position.x = 0.3;
      handle.rotateZ(Math.PI);
    } else {
      handle.position.x = -0.3;
    }

    const door = new Mesh(new BoxGeometry(this.width - 0.04, this.height - 0.04, 0.005), this.material);
    door.geometry.groups.forEach((face, index) => {
      face.materialIndex = 0;
      if (index == 5) {
        face.materialIndex = 1;
      }
    });
    door.castShadow = true;
    door.receiveShadow = true;
    for (let i = 0; i < door.material.length; i++) {
      door.material[i].map = door.material[i].map.clone();
      door.material[i].map.rotation = door.material[0].map.rotation;
      if (door.material[i].horizontal) {
        door.material[i].map.repeat.set(width - 0.04, height - 0.04);
        door.material[i].map.offset.set(door.material[i].map.offset.x, door.material[i].map.offset.y + 0.02);
      } else {
        door.material[i].map.repeat.set(height - 0.04, width - 0.04);
        door.material[i].map.offset.set(door.material[i].map.offset.x, door.material[i].map.offset.y - 0.02);
      }
    }

    const frameColor = door.material[0].color.clone();
    frameColor.addScalar(-0.5);

    const frameMaterial = new MeshBasicMaterial({
      color: frameColor,
      combine: MultiplyOperation,
      reflectivity: 0.5,
      map: this.material[0].map,
      side: DoubleSide,
    });
    const doorFrame = new Mesh(new PlaneGeometry(this.width, this.height), frameMaterial);
    doorFrame.castShadow = true;
    doorFrame.receiveShadow = true;

    const doorGroup = new Group();
    doorGroup.add(doorFrame, door, handle);
    doorGroup.name = this.name;
    doorGroup.position.y = this.height / 2;
    doorGroup.position.x = -0.005;

    this.object = doorGroup;
  }
}
