import * as Texture from "./textures";
import { MeshStandardMaterial, DoubleSide, Vector2 } from "three";

// RAL
const RAL_BASE = new MeshStandardMaterial({
  map: Texture.metalTexture.clone(),
  roughnessMap: Texture.metalTextureRoughness.clone(),
  roughness: 0.65,
  normalMap: Texture.metalTextureMap.clone(),
  normalScale: new Vector2(0.1, 0.7),
  metalness: 0.1,
  side: DoubleSide,
  color: 0xd1d1d1,
});

export const RAL1002 = RAL_BASE.clone();
RAL1002.setValues({ color: 0xd1a96c });

export const RAL3005 = RAL_BASE.clone();
RAL3005.setValues({ color: 0x571820 });

export const RAL3009 = RAL_BASE.clone();
RAL3009.setValues({ color: 0x6c332a });

export const RAL3011 = RAL_BASE.clone();
RAL3011.setValues({ color: 0x792322 });

export const RAL5010 = RAL_BASE.clone();
RAL5010.setValues({ color: 0x074e7a });

export const RAL6005 = RAL_BASE.clone();
RAL6005.setValues({ color: 0x124232 });

export const RAL6020 = RAL_BASE.clone();
RAL6020.setValues({ color: 0x485946 });

export const RAL6029 = RAL_BASE.clone();
RAL6029.setValues({ color: 0x186e3d });

export const RAL7016 = RAL_BASE.clone();
RAL7016.setValues({ color: 0x3a3d42 });

export const RAL7024 = RAL_BASE.clone();
RAL7024.setValues({ color: 0x45484d });

export const RAL7035 = RAL_BASE.clone();
RAL7035.setValues({ color: 0x929791 });

export const RAL8004 = RAL_BASE.clone();
RAL8004.setValues({ color: 0x8d4932 });

export const RAL8017 = RAL_BASE.clone();
RAL8017.setValues({ color: 0x432e29 });

export const RAL9002 = RAL_BASE.clone();
RAL9002.setValues({ color: 0x9d9e99 });

export const RAL9005 = RAL_BASE.clone();
RAL9005.setValues({ color: 0x262626 });

export const RAL9006 = RAL_BASE.clone();
RAL9006.setValues({ color: 0x868782 });

export const RAL9010 = RAL_BASE.clone();
RAL9010.setValues({ color: 0xaaaaaa });

// BTX
const BTX_BASE = new MeshStandardMaterial({
  map: Texture.metalTexture.clone(),
  roughnessMap: Texture.metalTextureRoughness.clone(),
  roughness: 1,
  normalMap: Texture.metalTextureMap.clone(),
  normalScale: new Vector2(0.05, 0.05),
  metalness: 0.2,
  side: DoubleSide,
  color: 0xd1d1d1,
});

export const BTX3005 = BTX_BASE.clone();
BTX3005.setValues({ color: 0x571820 });

export const BTX3009 = BTX_BASE.clone();
BTX3009.setValues({ color: 0x6c342b });

export const BTX3011 = BTX_BASE.clone();
BTX3011.setValues({ color: 0x792322 });

export const BTX6005 = BTX_BASE.clone();
BTX6005.setValues({ color: 0x124232 });

export const BTX7016 = BTX_BASE.clone();
BTX7016.setValues({ color: 0x3a3d42 });

export const BTX7024 = BTX_BASE.clone();
BTX7024.setValues({ color: 0x45484d });

export const BTX8004 = BTX_BASE.clone();
BTX8004.setValues({ color: 0x8d4932 });

export const BTX8017 = BTX_BASE.clone();
BTX8017.setValues({ color: 0x432e29 });

export const BTX9005 = BTX_BASE.clone();
BTX9005.setValues({ color: 0x262626 });

export const BTX6020 = BTX_BASE.clone();
BTX6020.setValues({ color: 0x495a47 });

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
