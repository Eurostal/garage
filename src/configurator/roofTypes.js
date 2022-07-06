import {
  Group,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  FrontSide,
  MeshStandardMaterial,
  Shape,
  ExtrudeGeometry,
  Vector2,
  Vector3,
  Plane,
  Quaternion,
} from "three";
import * as Texture from "./textures";
import * as Material from "./materials";

export const roofGable = function (width, length, yOffset, material) {
  let roofObject = new Group();
  let geometry = new BufferGeometry();
  let vertices = new Float32Array([-width / 2, 0, 0, 0, 0.5, 0, width / 2, 0, 0]);

  let uvs = new Float32Array([0, 0, 0.5, 0.25, 1, 0]);
  geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  // cloning first verticies as points on XY plane
  let roofPoints = [];
  for (let i = 0; i < vertices.length; i += 3) {
    roofPoints.push(new Vector2(vertices[i], vertices[i + 1]));
  }

  // creating top roof layer from previous vectors
  for (let i = roofPoints.length - 1; i >= 0; i--) {
    let newPoint = roofPoints[i].clone();
    newPoint.y += 0.015;
    roofPoints.push(newPoint);
  }

  const roofMaterial = material.clone();
  roofMaterial.map = material.map.clone();
  roofMaterial.map.repeat.set(1, 1);
  roofMaterial.map.rotation = 0;
  if (material.normalMap) {
    roofMaterial.normalMap = material.normalMap.clone();
    roofMaterial.normalMap.repeat.set(1, 1);
    roofMaterial.normalMap.rotation = 0;
  }
  if (roofMaterial.roughnessMap) {
    roofMaterial.roughnessMap = material.roughnessMap.clone();
    roofMaterial.roughnessMap.repeat.set(1, 1);
    roofMaterial.roughnessMap.rotation = 0;
  }
  if (roofMaterial.bumpMap) {
    roofMaterial.bumpMap = material.roughnessMap.clone();
    roofMaterial.bumpMap.repeat.set(1, 1);
    roofMaterial.bumpMap.rotation = 0;
  }

  const roofShape = new Shape(roofPoints);
  const extrudeSettings = {
    depth: length,
    bevelEnabled: false,
  };
  const geometryRoof = new ExtrudeGeometry(roofShape, extrudeSettings);
  const roof = new Mesh(geometryRoof, roofMaterial);
  roof.castShadow = true;
  roof.scale.set(1.05, 1.05, 1.05);
  roof.position.y = 0.5 * -0.05;
  roof.position.z = (-length * 1.05) / 2;

  roofObject.add(roof);
  roofObject.position.y = yOffset;

  const normalRight = new Vector3(-length, -width * length, 0);
  normalRight.normalize();
  const roofAngle = (Math.atan(0.5 / (width / 2)) * 180) / Math.PI;
  const d = Math.cos((roofAngle * Math.PI) / 180) * (yOffset + 0.5) - 0.001;
  const planeRight = new Plane(normalRight, d);

  const rotation = new Quaternion();
  rotation.setFromAxisAngle(new Vector3(0, 1, 0), -Math.PI);
  const normalLeft = normalRight.clone().applyQuaternion(rotation);
  const planeLeft = new Plane(normalLeft, d);
  const clippingPlane = [planeRight, planeLeft];

  return { roofObject, clippingPlane };
};

export const roofSloping = function (width, length, yOffset, material) {
  let roofObject = new Group();
  let geometry = new BufferGeometry();
  let vertices = new Float32Array([-width / 2, 0, 0, -width / 2, 0.5, 0, width / 2, 0, 0]); //slope on right

  let uvs = new Float32Array([0, 0, 0, 0.25, 1, 0]);
  geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  const roofMaterial = material.clone();
  roofMaterial.map = roofMaterial.map.clone();
  roofMaterial.map.repeat.set(1, 1);
  roofMaterial.map.rotation = 0;
  if (material.normalMap) {
    roofMaterial.normalMap = material.normalMap.clone();
    roofMaterial.normalMap.repeat.set(1, 1);
    roofMaterial.normalMap.rotation = 0;
  }
  if (roofMaterial.roughnessMap) {
    roofMaterial.roughnessMap = material.roughnessMap.clone();
    roofMaterial.roughnessMap.repeat.set(1, 1);
    roofMaterial.roughnessMap.rotation = 0;
  }
  if (roofMaterial.bumpMap) {
    roofMaterial.bumpMap = material.roughnessMap.clone();
    roofMaterial.bumpMap.repeat.set(1, 1);
    roofMaterial.bumpMap.rotation = 0;
  }

  // cloning first verticies as points on XY plane
  const roofTopPoints = [];
  // const roofSidePoints = [];
  for (let i = 0; i < vertices.length; i += 3) {
    if (i > 2) {
      roofTopPoints.push(new Vector2(vertices[i], vertices[i + 1]));
    }
  }

  // creating top roof layer from previous vectors
  for (let i = roofTopPoints.length - 1; i >= 0; i--) {
    let newPoint = roofTopPoints[i].clone();
    newPoint.y += 0.015;
    roofTopPoints.push(newPoint);
  }

  const roofTopShape = new Shape(roofTopPoints);
  const extrudeSettings = {
    depth: length,
    bevelEnabled: false,
  };
  const geometryRoofTop = new ExtrudeGeometry(roofTopShape, extrudeSettings);
  const roof = new Mesh(geometryRoofTop, roofMaterial);
  roof.castShadow = true;
  roof.scale.set(1.05, 1.05, 1.05);
  roof.position.y = 0.5 * -0.05;
  roof.position.z = (-length * 1.05) / 2;

  roofObject.add(roof);
  roofObject.position.y = yOffset;

  const normal = new Vector3(-length / 2, -width * length, 0);
  normal.normalize();
  const roofAngle = (Math.atan(0.5 / width) * 180) / Math.PI;
  const d = Math.cos((roofAngle * Math.PI) / 180) * (yOffset + 0.25) - 0.001;
  const clippingPlane = [new Plane(normal, d)];

  return { roofObject, clippingPlane };
};
