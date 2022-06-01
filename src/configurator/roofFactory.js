import roofSloping from "./roofSloping";
import roofGable from "./roofGable";

export function CreateRoof(type, width, length) {
  let roof = null;
  switch (type) {
    case "right":
      return new roofSloping(width, length).object;

    case "left":
      roof = new roofSloping(width, length).object;
      roof.rotateY(Math.PI);
      return roof;

    case "front":
      roof = new roofSloping(length, width).object;
      roof.rotateY(-Math.PI / 2);
      return roof;

    case "back":
      roof = new roofSloping(length, width).object;
      roof.rotateY(Math.PI / 2);
      return roof;

    default:
      return new roofGable(width, length).object;
  }
}
