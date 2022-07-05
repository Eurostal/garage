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

export const roofGable = function (width, length, yOffset) {
  let roofObject = new Group();
  let geometry = new BufferGeometry();
  let vertices = new Float32Array([-width / 2, 0, 0, 0, 0.5, 0, width / 2, 0, 0]);

  let uvs = new Float32Array([0, 0, 0.5, 0.25, 1, 0]);
  geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  const gableMaterial = Material.RAL9010.clone();
  gableMaterial.map = gableMaterial.map.clone();
  gableMaterial.map.flipY = false;
  gableMaterial.normalMap = gableMaterial.normalMap.clone();
  gableMaterial.normalMap.flipY = false;
  gableMaterial.roughnessMap = gableMaterial.roughnessMap.clone();
  gableMaterial.roughnessMap.flipY = false;

  if (gableMaterial.map.rotation == 0) {
    gableMaterial.map.repeat.set(width, 2);
    gableMaterial.normalMap.repeat.set(width, 2);
    gableMaterial.roughnessMap.repeat.set(width, 2);
  } else {
    gableMaterial.map.repeat.set(2, width);
    gableMaterial.normalMap.repeat.set(2, width);
    gableMaterial.roughnessMap.repeat.set(2, width);
  }

  const gableFront = new Mesh(geometry, gableMaterial);
  const gableBack = gableFront.clone();

  gableFront.position.z = length / 2;
  gableFront.receiveShadow = true;
  gableFront.castShadow = true;
  roofObject.add(gableFront);

  gableBack.position.z = -length / 2;
  gableBack.receiveShadow = true;
  gableBack.castShadow = true;
  gableBack.rotateY(Math.PI);
  roofObject.add(gableBack);

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

  const roofMaterial = Material.RAL9010.clone();
  roofMaterial.map = roofMaterial.map.clone();
  roofMaterial.map.repeat.set(1, 1);
  roofMaterial.map.rotation = 0;
  roofMaterial.normalMap = roofMaterial.normalMap.clone();
  roofMaterial.normalMap.repeat.set(1, 1);
  roofMaterial.normalMap.rotation = 0;
  roofMaterial.roughnessMap = roofMaterial.roughnessMap.clone();
  roofMaterial.roughnessMap.repeat.set(1, 1);
  roofMaterial.roughnessMap.rotation = 0;

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

  const clippingPlane = new Plane(new Vector3(0, -yOffset, 0), 1);

  return { roofObject, clippingPlane };
};

export const roofSloping = function (width, length, yOffset) {
  let roofObject = new Group();
  let geometry = new BufferGeometry();
  let vertices = new Float32Array([-width / 2, 0, 0, -width / 2, 0.5, 0, width / 2, 0, 0]); //slope on right

  let uvs = new Float32Array([0, 0, 0, 0.25, 1, 0]);
  geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  const gableMaterialSide = Material.RAL9010.clone();
  gableMaterialSide.map = gableMaterialSide.map.clone();
  gableMaterialSide.map.flipY = false;
  gableMaterialSide.normalMap = gableMaterialSide.normalMap.clone();
  gableMaterialSide.normalMap.flipY = false;
  gableMaterialSide.roughnessMap = gableMaterialSide.roughnessMap.clone();
  gableMaterialSide.roughnessMap.flipY = false;

  if (gableMaterialSide.map.rotation == 0) {
    gableMaterialSide.map.repeat.set(width, 2);
    gableMaterialSide.normalMap.repeat.set(width, 2);
    gableMaterialSide.roughnessMap.repeat.set(width, 2);
  } else {
    gableMaterialSide.map.repeat.set(2, width);
    gableMaterialSide.normalMap.repeat.set(2, width);
    gableMaterialSide.roughnessMap.repeat.set(2, width);
  }

  const gableFront = new Mesh(geometry, gableMaterialSide);
  gableFront.position.z = length / 2;
  gableFront.receiveShadow = true;
  gableFront.castShadow = true;
  roofObject.add(gableFront);

  const gableBack = gableFront.clone();
  gableBack.position.z = -length / 2;
  roofObject.add(gableBack);

  const roofMaterial = Material.RAL9010.clone();
  roofMaterial.map = roofMaterial.map.clone();
  roofMaterial.map.repeat.set(1, 1);
  roofMaterial.map.rotation = 0;
  roofMaterial.normalMap = roofMaterial.normalMap.clone();
  roofMaterial.normalMap.repeat.set(1, 1);
  roofMaterial.normalMap.rotation = 0;
  roofMaterial.roughnessMap = roofMaterial.roughnessMap.clone();
  roofMaterial.roughnessMap.repeat.set(1, 1);
  roofMaterial.roughnessMap.rotation = 0;

  // cloning first verticies as points on XY plane
  const roofTopPoints = [];
  const roofSidePoints = [];
  for (let i = 0; i < vertices.length; i += 3) {
    if (i > 2) {
      roofTopPoints.push(new Vector2(vertices[i], vertices[i + 1]));
    }
    if (i < vertices.length - 3) {
      roofSidePoints.push(new Vector2(vertices[i], vertices[i + 1]));
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

  const roofSideMaterial = gableMaterialSide.clone();
  roofSideMaterial.side = FrontSide;
  roofSideMaterial.map = gableMaterialSide.map.clone();
  roofSideMaterial.normalMap = gableMaterialSide.normalMap.clone();
  roofSideMaterial.roughnessMap = gableMaterialSide.roughnessMap.clone();
  roofSideMaterial.map.flipY = true;
  roofSideMaterial.normalMap.flipY = true;
  roofSideMaterial.roughnessMap.flipY = true;
  roofSideMaterial.map.repeat.set(2, 1);
  roofSideMaterial.normalMap.repeat.set(2, 1);
  roofSideMaterial.roughnessMap.repeat.set(2, 1);

  if (gableMaterialSide.map.rotation === Math.PI / 2) {
    roofSideMaterial.map.rotation = 0;
    roofSideMaterial.normalMap.rotation = 0;
    roofSideMaterial.roughnessMap.rotation = 0;
  } else {
    roofSideMaterial.map.rotation = Math.PI / 2;
    roofSideMaterial.normalMap.rotation = Math.PI / 2;
    roofSideMaterial.roughnessMap.rotation = Math.PI / 2;
  }

  const roofSideShape = new Shape(roofSidePoints);
  const geometryRoofSide = new ExtrudeGeometry(roofSideShape, extrudeSettings);
  const roofSide = new Mesh(geometryRoofSide, roofSideMaterial);
  roofSide.castShadow = true;
  roofSide.receiveShadow = true;
  roofSide.position.z = -length / 2;

  roofObject.add(roof, roofSide);
  roofObject.position.y = yOffset;

  const normal = new Vector3(-length / 2, -width * length, 0);
  normal.normalize();
  const roofAngle = (Math.atan(0.5 / width) * 180) / Math.PI;
  const d = Math.cos((roofAngle * Math.PI) / 180) * (yOffset + 0.25) - 0.001;
  const clippingPlane = new Plane(normal, d);

  return { roofObject, clippingPlane };
};
