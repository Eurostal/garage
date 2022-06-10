import WallElement from "./wallElement";
import { MeshStandardMaterial, MeshBasicMaterial, PlaneGeometry, Mesh, Group, BoxGeometry, MultiplyOperation, DoubleSide } from "three";

export default class Door extends WallElement {
  constructor(width, height, material, name) {
    super(width, height, material, name);

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
    handle.position.x = -0.3;

    const door = new Mesh(new BoxGeometry(this.width - 0.04, this.height - 0.04, 0.005), this.material);
    door.castShadow = true;
    door.receiveShadow = true;

    const frameColor = material.color.clone();
    frameColor.addScalar(-0.5);

    const frameMaterial = new MeshBasicMaterial({
      color: frameColor,
      combine: MultiplyOperation,
      reflectivity: 0.5,
      map: this.material.map,
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
