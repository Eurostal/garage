import { TextureLoader, RepeatWrapping } from "three";

const loader = new TextureLoader();

export const metalTexture = loadTexture("./src/assets/metal/metal.jpg");
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

export const grassTexture = loadTexture("./src/assets/grass.jpg");
grassTexture.rotation = Math.PI / 2;
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;
grassTexture.repeat.set(15, 15);
grassTexture.matrixAutoUpdate = true;

export const concreteTexture = loadTexture("./src/assets/concrete.jpg");
concreteTexture.rotation = Math.PI / 2;
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
