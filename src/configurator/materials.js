import * as Texture from "./textures";
import { MeshStandardMaterial, DoubleSide } from "three";

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
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x000000,
  color: 0x6c332a,
  side: DoubleSide,
});
