import { Mesh, PlaneGeometry, BoxGeometry, Group, MeshStandardMaterial, MeshBasicMaterial, MultiplyOperation, DoubleSide, Color } from "three";

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
  const gateGroup = new Group();

  const gateDoor = new Mesh(new BoxGeometry(width - 0.04, height - 0.04, 0.005), material);
  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  const frameColor = material.color.clone();
  frameColor.addScalar(-0.5);

  const frameMaterial = new MeshBasicMaterial({
    color: frameColor,
    combine: MultiplyOperation,
    reflectivity: 0.5,
    map: material.map,
    side: DoubleSide,
  });
  const gateDoorFrame = new Mesh(new PlaneGeometry(width, height), frameMaterial);
  gateDoorFrame.castShadow = true;
  gateDoorFrame.receiveShadow = true;

  const separator = new Mesh(
    new PlaneGeometry(0.02, height),
    new MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.6,
    })
  );
  separator.position.z = 0.005;
  handle.position.y = -height / 2 + 0.9;

  gateGroup.add(separator, gateDoor, gateDoorFrame, handle);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const tiltedWidepanelDoor = function createTiltedWidepanelDoor(width, height, material) {
  const gateGroup = new Group();
  material.map.rotation = Math.PI;
  material.map.repeat.set(width, 0.9);

  const gateDoor = new Mesh(new BoxGeometry(width - 0.04, height - 0.04, 0.005), material);
  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  const frameColor = material.color.clone();
  frameColor.addScalar(-0.5);

  const frameMaterial = new MeshBasicMaterial({
    color: frameColor,
    combine: MultiplyOperation,
    reflectivity: 0.5,
    map: material.map,
    side: DoubleSide,
  });
  const gateDoorFrame = new Mesh(new PlaneGeometry(width, height), frameMaterial);
  gateDoorFrame.castShadow = true;
  gateDoorFrame.receiveShadow = true;

  handle.position.y = -height / 2 + 0.6;
  handle.position.x = 0;
  handle.rotation.z = -Math.PI / 2;

  gateGroup.add(gateDoor, gateDoorFrame, handle);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const tiltedDoor = function createTiltedDoor(width, height, material) {
  const gateGroup = new Group();

  const gateDoor = new Mesh(new BoxGeometry(width - 0.04, height - 0.04, 0.005), material);
  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  const frameColor = material.color.clone();
  frameColor.addScalar(-0.5);

  const frameMaterial = new MeshBasicMaterial({
    color: frameColor,
    combine: MultiplyOperation,
    reflectivity: 0.5,
    map: material.map,
    side: DoubleSide,
  });
  const gateDoorFrame = new Mesh(new PlaneGeometry(width, height), frameMaterial);
  gateDoorFrame.castShadow = true;
  gateDoorFrame.receiveShadow = true;

  handle.position.y = -height / 2 + 0.6;
  handle.position.x = 0;
  handle.rotation.z = -Math.PI / 2;

  gateGroup.add(gateDoor, gateDoorFrame, handle);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const empty = function createEmpty(width, height, material) {
  const noGate = new Mesh(new PlaneGeometry(0, 0), material);
  noGate.visible = false;

  return noGate;
};
