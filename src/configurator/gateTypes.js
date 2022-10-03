import { Mesh, PlaneGeometry, BoxGeometry, Group, MeshStandardMaterial, MeshBasicMaterial, MultiplyOperation, DoubleSide, Vector2 } from "three";
import * as Texture from "./textures";

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

  const gateDoor = new Mesh(new BoxGeometry(width - 0.04, height - 0.04, 0.005), material[0]);
  gateDoor.geometry.groups.forEach((face, index) => {
    face.materialIndex = 0;
    if (index == 5) {
      face.materialIndex = 1;
    }
  });

  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  for (let i = 0; i < material.length; i++) {
    gateDoor.material[i].map = material[i].map;
    gateDoor.material[i].map.rotation = material[0].map.rotation;
    if (material[i].horizontal) {
      gateDoor.material[i].map.repeat.set(width - 0.04, height - 0.04);
      gateDoor.material[i].map.offset.set(gateDoor.material[i].map.offset.x, gateDoor.material[i].map.offset.y + 0.02);
    } else {
      gateDoor.material[i].map.repeat.set(height - 0.04, width - 0.04);
      gateDoor.material[i].map.offset.set(gateDoor.material[i].map.offset.x, gateDoor.material[i].map.offset.y - 0.02);
    }
  }

  const frameColor = material[0].color.clone();
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
  const handleClone = handle.clone();
  handleClone.position.y = -height / 2 + 0.9;

  gateGroup.add(separator, gateDoor, gateDoorFrame, handleClone);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const tiltedWidepanelDoor = function createTiltedWidepanelDoor(width, height, material) {
  const gateGroup = new Group();
  const gateDoorMaterial = material[0].clone();
  if (material.customType.includes("WOOD")) {
    gateDoorMaterial.map = Texture.woodTextureWide.clone();
    gateDoorMaterial.roughnessMap = Texture.woodTextureWideMap.clone();
    gateDoorMaterial.bumpMap = Texture.woodTextureWideMap.clone();
  } else {
    gateDoorMaterial.map = Texture.metalTextureWide.clone();
    gateDoorMaterial.roughnessMap = Texture.metalTextureWideMap.clone();
    gateDoorMaterial.normalMap = Texture.metalTextureWideMap.clone();
    gateDoorMaterial.normalScale = new Vector2(-0.05, 0.05);
  }

  const gateDoor = new Mesh(new BoxGeometry(width - 0.04, height - 0.04, 0.005), gateDoorMaterial);
  gateDoor.geometry.groups.forEach((face, index) => {
    face.materialIndex = 0;
    if (index == 5) {
      face.materialIndex = 1;
    }
  });

  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  const frameColor = material[0].color.clone();
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

  const handleClone = handle.clone();
  handleClone.position.y = -height / 2 + 0.6;
  handleClone.position.x = 0;
  handleClone.rotation.z = -Math.PI / 2;

  gateGroup.add(gateDoor, gateDoorFrame, handleClone);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const tiltedDoor = function createTiltedDoor(width, height, material) {
  const gateGroup = new Group();

  const gateDoor = new Mesh(new BoxGeometry(width - 0.04, height - 0.04, 0.005), material);
  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;
  for (let i = 0; i < material.length; i++) {
    gateDoor.material[i].map = material[i].map;
    gateDoor.material[i].map.rotation = material[0].map.rotation;
    if (material[i].horizontal) {
      gateDoor.material[i].map.repeat.set(width - 0.04, height - 0.04);
      gateDoor.material[i].map.offset.set(gateDoor.material[i].map.offset.x, gateDoor.material[i].map.offset.y + 0.02);
    } else {
      gateDoor.material[i].map.repeat.set(height - 0.04, width - 0.04);
      gateDoor.material[i].map.offset.set(gateDoor.material[i].map.offset.x, gateDoor.material[i].map.offset.y - 0.02);
    }
  }

  const frameColor = material[0].color.clone();
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

  const handleClone = handle.clone();
  handleClone.position.y = -height / 2 + 0.6;
  handleClone.position.x = 0;
  handleClone.rotation.z = -Math.PI / 2;

  gateGroup.add(gateDoor, gateDoorFrame, handleClone);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const empty = function createEmpty(width, height, material) {
  const noGate = new Mesh(new PlaneGeometry(0, 0), material);
  noGate.visible = false;

  return noGate;
};
