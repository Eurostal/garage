import { Mesh, PlaneGeometry, BoxGeometry, Group, MeshStandardMaterial } from "three";

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
handle.position.x = 0.1;

export const doubleDoor = function createDoubleDoor(width, height, material) {
  let gateGroup = new Group();

  let gateDoor = new Mesh(new PlaneGeometry(width, height), material);
  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  let separator = new Mesh(
    new PlaneGeometry(0.02, height),
    new MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.6,
    })
  );
  separator.position.z = 0.001;
  handle.position.y = -height / 2 + 0.9;

  gateGroup.add(separator, gateDoor, handle);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const empty = function createEmpty(width, height, material) {
  let noGate = new Mesh(new PlaneGeometry(0, 0), material);
  noGate.visible = false;

  return noGate;
};
