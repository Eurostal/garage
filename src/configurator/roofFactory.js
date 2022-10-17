import { roofSloping, roofGable } from "./roofTypes";
import { Quaternion, Vector3 } from "three";

export function createRoof(type, width, length, yOffset, material, peakHeight) {
  let roof = null;
  let rotation = new Quaternion();
  switch (type) {
    case "right":
      roof = roofSloping(width, length, yOffset, material, peakHeight);
      return roof;

    case "left":
      roof = roofSloping(width, length, yOffset, material, peakHeight);
      roof.roofObject.rotateY(Math.PI);
      rotation.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);
      roof.clippingPlane.forEach((plane) => plane.normal.applyQuaternion(rotation));
      return roof;

    case "front":
      roof = roofSloping(length, width, yOffset, material, peakHeight);
      roof.roofObject.rotateY(-Math.PI / 2);
      rotation.setFromAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2);
      roof.clippingPlane.forEach((plane) => plane.normal.applyQuaternion(rotation));
      return roof;

    case "back":
      roof = roofSloping(length, width, yOffset - 0.1, material, peakHeight);
      roof.roofObject.rotateY(Math.PI / 2);
      rotation.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
      roof.clippingPlane.forEach((plane) => plane.normal.applyQuaternion(rotation));
      return roof;

    case "gable":
      return roofGable(width, length, yOffset, material, peakHeight);
  }
}
