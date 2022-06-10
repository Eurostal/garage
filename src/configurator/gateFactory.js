import { doubleDoor, tiltedDoor, tiltedWidepanelDoor, empty } from "./gateTypes";

export function createGate(type, width, height, material) {
  switch (type) {
    case "double":
      return doubleDoor(width, height, material);
    case "tilted":
      return tiltedDoor(width, height, material);
    case "wide":
      return tiltedWidepanelDoor(width, height, material);
    default:
      return empty(width, height, material);
  }
}
