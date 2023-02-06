import { doubleDoor, tiltedDoor, tiltedWidepanelDoor, emptyDoor } from "./gateTypes";

export function createGate(type, width, height, material, handle, frameReflective) {
  switch (type) {
    case "double":
      return doubleDoor(width, height, material, handle, frameReflective);
    case "tilted":
      return tiltedDoor(width, height, material, frameReflective);
    case "wide":
      return tiltedWidepanelDoor(width, height, material, frameReflective);
    default:
      return emptyDoor(width, height, material, frameReflective);
  }
}
