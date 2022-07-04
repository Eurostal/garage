import * as Texture from "./textures";
import { MeshStandardMaterial, DoubleSide } from "three";

// RAL

export const RAL9010 = new MeshStandardMaterial({
  map: Texture.metalTexture.clone(),
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x000000,
  color: 0xffffff,
  side: DoubleSide,
});

export const RAL3009 = new MeshStandardMaterial({
  map: Texture.metalTexture.clone(),
  roughnessMap: Texture.metalTextureMap.clone(),
  metalness: 0.2,
  roughness: 0.65,
  // emissive: 0x4c130a,
  color: 0x6c332a,
  side: DoubleSide,
});
// BTX

// WOOD

// OTHER

export const WHITE = new MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x000000,
  color: 0xffffff,
  side: DoubleSide,
});

export const GRAY = new MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x000000,
  color: 0x595959,
  side: DoubleSide,
});

export const BROWN = new MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x000000,
  color: 0x7f553c,
  side: DoubleSide,
});
