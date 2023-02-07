import {
  Mesh,
  PlaneGeometry,
  BoxGeometry,
  Group,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MultiplyOperation,
  DoubleSide,
  Vector2,
  Shape,
  Path,
  Color,
  CylinderGeometry,
  ExtrudeGeometry,
  MeshPhongMaterial,
  MixOperation
} from "three";
import { Materials } from "./materials";
import * as Texture from "./textures";


const frameColorNormal = new Color(0x3d2105);

const frameMaterialNormal = new MeshBasicMaterial({
  color: frameColorNormal,
  combine: MultiplyOperation,
  reflectivity: 0.5,
  map: Materials.RAL9010.map.clone(),
  side: DoubleSide,
});

const frameMaterialLight = new MeshPhongMaterial({
  color: new Color(0xa2a2a2),
  emissive: new Color(0x000000),
  reflectivity: 0.15,
  shininess: 100,
  flatShading: true,
  envMap: Texture.reflectionCube,
  combine: MixOperation,
  side: DoubleSide,
});


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

const frameWidth = 0.05;
const frameWidthWide = 0.1;

export const doubleDoor = function createDoubleDoor(width, height, material, handleVisible, frameReflective) {
  const gateGroup = new Group();

  const gateDoor = new Mesh(new BoxGeometry(width - frameWidth * 2, height - frameWidth * 2, 0.005), material);
  gateDoor.geometry.groups.forEach((face, index) => {
    face.materialIndex = 0;
    if (index == 5) {
      face.materialIndex = 1;
    }
  });

  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;
  if (material.horizontal) {
    gateDoor.material.map = material.map.clone();
    gateDoor.material.map.repeat.set(width - frameWidth * 2, height - frameWidth * 2);
    gateDoor.material.map.offset.set(gateDoor.material.map.offset.x, gateDoor.material.map.offset.y + frameWidth);
  } else {
    gateDoor.material.map = material.map.clone();
    gateDoor.material.map.repeat.set(height - frameWidth * 2, width - frameWidth * 2);
    gateDoor.material.map.offset.set(gateDoor.material.map.offset.x, gateDoor.material.map.offset.y - frameWidth);
  }

  const gateDoorFrame = new Mesh(new PlaneGeometry(width, height), frameReflective? frameMaterialLight:frameMaterialNormal);
  gateDoorFrame.castShadow = true;
  gateDoorFrame.receiveShadow = true;

  const separator = new Mesh(
    new PlaneGeometry(frameWidth / 2, height),
    new MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.6,
    })
  );
  separator.position.z = 0.005;

  gateGroup.add(separator, gateDoor, gateDoorFrame);
  if (handleVisible) {
    const handleClone = handle.clone();
    handleClone.position.y = -height / 2 + 0.9;
    gateGroup.add(handleClone);
  } else {
    const keyhole = new Mesh(
      new CylinderGeometry(0.014, 0.014, 0.01, 20),
      new MeshStandardMaterial({
        color: 0x000000,
      })
    );
    keyhole.rotateX(Math.PI / 2);
    keyhole.position.y = -height / 2 + 0.9;
    keyhole.position.x = 0.05;

    gateGroup.add(keyhole);
  }

  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;

  return gateGroup;
};

export const tiltedWidepanelDoor = function createTiltedWidepanelDoor(width, height, material, frameReflective) {
  const gateGroup = new Group();
  const gateDoorMaterial = material.clone();
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

  const gateDoor = new Mesh(new BoxGeometry(width - frameWidthWide * 2, height - frameWidthWide - frameWidth, 0.005), gateDoorMaterial);
  gateDoor.geometry.groups.forEach((face, index) => {
    face.materialIndex = 0;
    if (index == 5) {
      face.materialIndex = 1;
    }
  });

  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;

  const gateDoorFrame = new Mesh(new PlaneGeometry(width, height), frameReflective? frameMaterialLight:frameMaterialNormal);
  gateDoorFrame.castShadow = true;
  gateDoorFrame.receiveShadow = true;

  const handleClone = handle.clone();
  handleClone.position.y = -height / 2 + 0.6;
  handleClone.position.x = 0;
  handleClone.rotation.z = -Math.PI / 2;

  gateGroup.add(gateDoor, gateDoorFrame, handleClone);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;
  gateDoor.translateY(-0.04);

  return gateGroup;
};

export const tiltedDoor = function createTiltedDoor(width, height, material, frameReflective) {
  const gateGroup = new Group();

  const gateDoor = new Mesh(new BoxGeometry(width - frameWidthWide * 2, height - frameWidthWide - frameWidth, 0.005), material);
  gateDoor.castShadow = true;
  gateDoor.receiveShadow = true;
  if (material.horizontal) {
    gateDoor.material.map = material.map.clone();
    gateDoor.material.map.repeat.set(width - frameWidthWide * 2, height - frameWidthWide - frameWidth);
    gateDoor.material.map.offset.set(gateDoor.material.map.offset.x, gateDoor.material.map.offset.y + frameWidthWide);
  } else {
    gateDoor.material.map = material.map.clone();
    gateDoor.material.map.repeat.set(height - frameWidthWide - frameWidth, width - frameWidthWide * 2);
    gateDoor.material.map.offset.set(gateDoor.material.map.offset.x, gateDoor.material.map.offset.y - frameWidthWide);
  }

  const gateDoorFrame = new Mesh(new PlaneGeometry(width, height), frameReflective? frameMaterialLight:frameMaterialNormal);
  gateDoorFrame.castShadow = true;
  gateDoorFrame.receiveShadow = true;

  const handleClone = handle.clone();
  handleClone.position.y = -height / 2 + 0.6;
  handleClone.position.x = 0;
  handleClone.rotation.z = -Math.PI / 2;

  gateGroup.add(gateDoor, gateDoorFrame, handleClone);
  gateGroup.position.y = height / 2;
  gateGroup.position.z = -0.005;
  gateDoor.translateY(-0.04);
  return gateGroup;
};

export const emptyDoor = function createEmpty(width, height, material, frameReflective) {
  // const emptyGate = new Mesh(new PlaneGeometry(0, 0), material);
  // noGate.visible = false;

  let offsetY = 0.1;

  const frameShape = new Shape();
  frameShape.moveTo(-width / 2, 0);
  frameShape.lineTo(-width / 2, height + offsetY);
  frameShape.lineTo(width / 2, height + offsetY);
  frameShape.lineTo(width / 2, 0);

  const frameInnerPath = new Path();
  frameInnerPath.moveTo(-width / 2 + 0.05, 0);
  frameInnerPath.lineTo(-width / 2 + 0.05, height - 0.05 + offsetY);
  frameInnerPath.lineTo(width / 2 - 0.05, height - 0.05 + offsetY);
  frameInnerPath.lineTo(width / 2 - 0.05, 0);

  frameShape.holes = [frameInnerPath];

  const frameGeometry = new ExtrudeGeometry(frameShape, {
    depth: 0.005,
    bevelEnabled: false,
  });

  const frameMesh = new Mesh(frameGeometry, frameReflective? frameMaterialLight:frameMaterialNormal);
  frameMesh.receiveShadow = true;
  frameMesh.castShadow = true;
  frameMesh.translateY(-offsetY);
  frameMesh.translateZ(-0.005);

  return frameMesh;
};
