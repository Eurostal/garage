import { roofSloping } from "./roofSloping";
import { roofGable } from "./roofGable";

export function createRoof(type, width, length) {
  let roof = null;
  switch (type) {
    case "right":
      return roofSloping(width, length);

    case "left":
      roof = roofSloping(width, length);
      roof.rotateY(Math.PI);
      return roof;

    case "front":
      roof = roofSloping(length, width);
      roof.rotateY(-Math.PI / 2);
      return roof;

    case "back":
      roof = roofSloping(length, width);
      roof.rotateY(Math.PI / 2);
      return roof;

    default:
      return roofGable(width, length);
  }
}
