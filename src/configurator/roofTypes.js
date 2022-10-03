import { Group, Mesh, BufferGeometry, BufferAttribute, Shape, ExtrudeGeometry, Vector2, Vector3, Plane, Quaternion } from "three";

export const roofGable = function (width, length, yOffset, material, peakHeight) {
  let roofObject = new Group();
  let geometry = new BufferGeometry();
  let vertices = new Float32Array([-width / 2, 0, 0, 0, peakHeight, 0, width / 2, 0, 0]);

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
  geometryRoof.groups.forEach((face) => {
    face.materialIndex = 0;
  });
  const roof = new Mesh(geometryRoof, [roofMaterial, Array.isArray(material) ? material[1] : null]);
  roof.castShadow = true;
  roof.scale.set(1.05, 1.05, 1.05);
  roof.position.y = peakHeight * -0.05;
  roof.position.z = (-length * 1.05) / 2;

  roofObject.add(roof);
  roofObject.position.y = yOffset;

  const roofInside = roof.clone();
  roofInside.scale.set(1.0495, 1.0495, 1.0495);
  roofInside.geometry = roofInside.geometry.clone();
  roofInside.geometry.groups.forEach((face) => {
    face.materialIndex = 1;
  });
  roofInside.position.y = roofInside.position.y - 0.001;
  roofObject.add(roofInside);

  const normalRight = new Vector3(-length * peakHeight * 2, -width * length, 0);
  normalRight.normalize();
  const roofAngle = (Math.atan(peakHeight / (width / 2)) * 180) / Math.PI;
  const d = Math.cos((roofAngle * Math.PI) / 180) * (yOffset + peakHeight) - 0.001;
  const planeRight = new Plane(normalRight, d);

  const rotation = new Quaternion();
  rotation.setFromAxisAngle(new Vector3(0, 1, 0), -Math.PI);
  const normalLeft = normalRight.clone().applyQuaternion(rotation);
  const planeLeft = new Plane(normalLeft, d);
  const clippingPlane = [planeRight, planeLeft];

  return { roofObject, clippingPlane };
};

export const roofSloping = function (width, length, yOffset, material, peakHeight) {
  let roofObject = new Group();
  let geometry = new BufferGeometry();
  let vertices = new Float32Array([-width / 2, 0, 0, -width / 2, peakHeight, 0, width / 2, 0, 0]); //slope on right

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
  geometryRoofTop.groups.forEach((face) => {
    face.materialIndex = 0;
  });

  const roof = new Mesh(geometryRoofTop, roofMaterial);
  roof.castShadow = true;
  roof.scale.set(1.05, 1.05, 1.05);
  roof.position.y = peakHeight * -0.05;
  roof.position.z = (-length * 1.05) / 2;

  roofObject.add(roof);
  roofObject.position.y = yOffset;

  const roofInside = roof.clone();
  roofInside.scale.set(1.0495, 1.0495, 1.0495);
  roofInside.geometry = roofInside.geometry.clone();
  roofInside.geometry.groups.forEach((face) => {
    face.materialIndex = 1;
  });
  roofInside.position.y = roofInside.position.y - 0.001;
  roofInside.position.z = (-length * 1.0495) / 2;

  roofObject.add(roofInside);

  const normal = new Vector3(-length * peakHeight, -width * length, 0);
  normal.normalize();
  const roofAngle = (Math.atan(peakHeight / width) * 180) / Math.PI;
  const d = Math.cos((roofAngle * Math.PI) / 180) * (yOffset + peakHeight / 2) - 0.001;
  const clippingPlane = [new Plane(normal, d)];

  return { roofObject, clippingPlane };
};
