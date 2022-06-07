import { roofSloping, roofGable } from "./roofTypes";
import { Quaternion, Vector3 } from "three";

export function createRoof(type, width, length, yOffset) {
  let roof = null;
  let rotation = new Quaternion();
  switch (type) {
    case "right":
      roof = roofSloping(width, length, yOffset);
      return roof;

    case "left":
      roof = roofSloping(width, length, yOffset);
      roof.roofObject.rotateY(Math.PI);

      rotation.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);
      roof.clippingPlane.normal.applyQuaternion(rotation);

      return roof;

    case "front":
      roof = roofSloping(length, width, yOffset);
      roof.roofObject.rotateY(-Math.PI / 2);

      rotation = new Quaternion();
      rotation.setFromAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2);
      roof.clippingPlane.normal.applyQuaternion(rotation);

      return roof;

    case "back":
      roof = roofSloping(length, width, yOffset);
      roof.roofObject.rotateY(Math.PI / 2);

      rotation = new Quaternion();
      rotation.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
      roof.clippingPlane.normal.applyQuaternion(rotation);

      return roof;

    default:
      return roofGable(width, length, yOffset);
  }
}
