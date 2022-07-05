import { DoubleSide,Vector2 } from "three";
import * as Texture from './textures'

export const SOLID = {
  metalness: 0.2,
  roughness: 0.5,
  emissive: 0x000000,
  side: DoubleSide,
};

export const RAL = {
  map: Texture.metalTexture.clone(),
  roughnessMap: Texture.metalTextureRoughness.clone(),
  roughness: 0.65,
  normalMap: Texture.metalTextureMap.clone(),
  normalScale: new Vector2(0.1, 0.7),
  metalness: 0.1,
  side: DoubleSide,
};

export const BTX = {
  map: Texture.metalTexture.clone(),
  roughnessMap: Texture.metalTextureRoughness.clone(),
  roughness: 1,
  normalMap: Texture.metalTextureMap.clone(),
  normalScale: new Vector2(0.05, 0.05),
  metalness: 0.2,
  side: DoubleSide,
};

export const WOOD = {
  map: Texture.woodTexture.clone(),
  bumpMap: Texture.woodTexture.clone(),
  bumpScale: 0.005,
  roughnessMap: Texture.woodTextureMap.clone(),
  roughness: 0.9,
  metalness: 0,
  side: DoubleSide,
};

export const WOOD_SHINE = {
  map: Texture.woodTexture.clone(),
  bumpMap: Texture.woodTexture.clone(),
  bumpScale: 0.002,
  roughnessMap: Texture.woodTextureMap.clone(),
  roughness: 0.7,
  metalness: 0.05,
  side: DoubleSide,
};
