import { TextureLoader, RepeatWrapping } from "three";

const loader = new TextureLoader();

export const metalTexture = loadTexture("./src/assets/metal/metal.png");
metalTexture.rotation = Math.PI / 2;
metalTexture.wrapS = RepeatWrapping;
metalTexture.wrapT = RepeatWrapping;
metalTexture.matrixAutoUpdate = true;

export const metalTextureMap = loadTexture("./src/assets/metal/metal-normal.png");
metalTextureMap.rotation = Math.PI / 2;
metalTextureMap.wrapS = RepeatWrapping;
metalTextureMap.wrapT = RepeatWrapping;
metalTextureMap.matrixAutoUpdate = true;

export const metalTextureRoughness = loadTexture("./src/assets/metal/metal-roughness.png");
metalTextureMap.rotation = Math.PI / 2;
metalTextureMap.wrapS = RepeatWrapping;
metalTextureMap.wrapT = RepeatWrapping;
metalTextureMap.matrixAutoUpdate = true;

export const metalTextureHeight = loadTexture("./src/assets/metal/metal-height.png");
metalTextureMap.rotation = Math.PI / 2;
metalTextureMap.wrapS = RepeatWrapping;
metalTextureMap.wrapT = RepeatWrapping;
metalTextureMap.matrixAutoUpdate = true;

export const metalTextureWide = loadTexture("./src/assets/metal/metal-wide.png");
metalTextureWide.rotation = -Math.PI;
metalTextureWide.wrapS = RepeatWrapping;
metalTextureWide.wrapT = RepeatWrapping;
metalTextureWide.matrixAutoUpdate = true;

export const metalTextureWideMap = loadTexture("./src/assets/metal/metal-wide-normal.png");
metalTextureWideMap.rotation = -Math.PI;
metalTextureWideMap.wrapS = RepeatWrapping;
metalTextureWideMap.wrapT = RepeatWrapping;
metalTextureWideMap.matrixAutoUpdate = true;

export const woodTexture = loadTexture("./src/assets/wood/wood.png");
woodTexture.rotation = Math.PI / 2;
woodTexture.wrapS = RepeatWrapping;
woodTexture.wrapT = RepeatWrapping;
woodTexture.matrixAutoUpdate = true;

export const woodTextureMap = loadTexture("./src/assets/wood/wood-normal.png");
woodTextureMap.rotation = Math.PI / 2;
woodTextureMap.wrapS = RepeatWrapping;
woodTextureMap.wrapT = RepeatWrapping;
woodTextureMap.matrixAutoUpdate = true;

export const woodTextureWide = loadTexture("./src/assets/wood/wood-wide.png");
woodTexture.rotation = Math.PI / 2;
woodTexture.wrapS = RepeatWrapping;
woodTexture.wrapT = RepeatWrapping;
woodTexture.matrixAutoUpdate = true;

export const woodTextureWideMap = loadTexture("./src/assets/wood/wood-wide-normal.png");
woodTextureMap.rotation = Math.PI / 2;
woodTextureMap.wrapS = RepeatWrapping;
woodTextureMap.wrapT = RepeatWrapping;
woodTextureMap.matrixAutoUpdate = true;

export const grassTexture = loadTexture("./src/assets/grass.jpg");
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;
grassTexture.repeat.set(5, 5);
grassTexture.matrixAutoUpdate = true;

export const concreteTexture = loadTexture("./src/assets/concrete.jpg");
concreteTexture.wrapS = RepeatWrapping;
concreteTexture.wrapT = RepeatWrapping;
concreteTexture.repeat.set(3, 3);
concreteTexture.matrixAutoUpdate = true;

function loadTexture(url) {
  let texture = loader.load(
    url,
    function () {
      console.log("texture loaded");
    },
    function () {
      console.log("loading textures");
    },
    function (err) {
      console.log(err);
    }
  );
  return texture;
}
