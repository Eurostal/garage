import * as Texture from "./textures";
import { MeshStandardMaterial, DoubleSide, Vector2 } from "three";

// RAL
const RAL_BASE = new MeshStandardMaterial({
  map: Texture.metalTexture.clone(),
  roughnessMap: Texture.metalTextureMap.clone(),
  normalMap: Texture.metalTextureMap.clone(),
  normalScale: new Vector2(0.1, 0.7),
  metalness: 0.1,
  roughness: 0.6,
  side: DoubleSide,
  color: 0xd1d1d1,
});

export const RAL1002 = RAL_BASE.clone();
RAL1002.setValues({ color: 0xd1a96c });

export const RAL9010 = RAL_BASE.clone();
RAL9010.setValues({ color: 0xd1d1d1 });

export const RAL3005 = RAL_BASE.clone();
RAL3005.setValues({ color: 0x571820 });

export const RAL3009 = RAL_BASE.clone();
RAL3009.setValues({ color: 0x6c332a });

// export const RAL3009 = new MeshStandardMaterial({
//   map: Texture.metalTexture.clone(),
//   roughnessMap: Texture.metalTextureMap.clone(),
//   metalness: 0.2,
//   roughness: 0.65,
//   // emissive: 0x4c130a,
//   color: 0x6c332a,
//   side: DoubleSide,
// });

// BTX

// WOOD

export const WOOD_LIGHT = new MeshStandardMaterial({
  map: Texture.woodTexture.clone(),
  bumpMap: Texture.woodTexture.clone(),
  bumpScale: 0.005,
  roughnessMap: Texture.woodTextureMap.clone(),
  roughness: 0.9,
  metalness: 0,
  color: 0x9d745e,
  side: DoubleSide,
});

export const WOOD_LIGHT_SHINE = new MeshStandardMaterial({
  map: Texture.woodTexture.clone(),
  bumpMap: Texture.woodTexture.clone(),
  bumpScale: 0.002,
  roughnessMap: Texture.woodTextureMap.clone(),
  roughness: 0.7,
  metalness: 0.05,
  color: 0x9d745e,
  side: DoubleSide,
});

export const WOOD_DARK = new MeshStandardMaterial({
  map: Texture.woodTexture.clone(),
  bumpMap: Texture.woodTexture.clone(),
  bumpScale: 0.005,
  roughnessMap: Texture.woodTextureMap.clone(),
  roughness: 0.9,
  metalness: 0,
  color: 0x45231d,
  side: DoubleSide,
});

export const WOOD_DARK_SHINE = new MeshStandardMaterial({
  map: Texture.woodTexture.clone(),
  bumpMap: Texture.woodTexture.clone(),
  bumpScale: 0.001,
  roughnessMap: Texture.woodTextureMap.clone(),
  roughness: 0.7,
  metalness: 0.05,
  color: 0x45231d,
  side: DoubleSide,
});

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
