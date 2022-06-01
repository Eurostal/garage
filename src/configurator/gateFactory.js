import { doubleDoor, tiltedDoor, empty } from "./gateTypes";

export function createGate(type, width, height, material) {
  switch (type) {
    case "double":
      return doubleDoor(width, height, material);
    case "tilted":
      return tiltedDoor(width, height, material);
    default:
      return empty(width, height, material);
  }
}
