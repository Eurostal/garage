import { TextureLoader, RepeatWrapping, CubeTextureLoader } from 'three'
import imgUrlmetalTexture from '/src/assets/metal/metal.webp'
import imgUrlmetalTextureMap from '/src/assets/metal/metal-normal.webp'
import imgUrlmetalTextureRoughness from '/src/assets/metal/metal-roughness.webp'
import imgUrlmetalTextureHeight from '/src/assets/metal/metal-height.webp'
import imgUrlmetalTextureWide from '/src/assets/metal/metal-wide.webp'
import imgUrlmetalTextureWideMap from '/src/assets/metal/metal-wide-normal.webp'
import imgUrlwoodTexture from '/src/assets/wood/wood.webp'
import imgUrlwoodTextureWide from '/src/assets/wood/wood-wide.webp'
import imgUrlwoodTextureMap from '/src/assets/wood/wood-normal.webp'
import imgUrlwoodTextureWideMap from '/src/assets/wood/wood-wide-normal.webp'
import imgUrlgrassTexture from '/src/assets/grass.webp'
import imgUrlconcreteTexture from '/src/assets/concrete.webp'
import imgCubemapBtm from '/src/assets/cubemap/btm.webp'
import imgCubemapSide from '/src/assets/cubemap/side.webp'
import imgCubemapTop from '/src/assets/cubemap/top.webp'

const loader = new TextureLoader()

export const metalTexture = loadTexture(imgUrlmetalTexture)
metalTexture.rotation = Math.PI / 2
metalTexture.wrapS = RepeatWrapping
metalTexture.wrapT = RepeatWrapping
metalTexture.matrixAutoUpdate = true

export const metalTextureMap = loadTexture(imgUrlmetalTextureMap)
metalTextureMap.rotation = Math.PI / 2
metalTextureMap.wrapS = RepeatWrapping
metalTextureMap.wrapT = RepeatWrapping
metalTextureMap.matrixAutoUpdate = true

export const metalTextureRoughness = loadTexture(imgUrlmetalTextureRoughness)
metalTextureMap.rotation = Math.PI / 2
metalTextureMap.wrapS = RepeatWrapping
metalTextureMap.wrapT = RepeatWrapping
metalTextureMap.matrixAutoUpdate = true

export const metalTextureHeight = loadTexture(imgUrlmetalTextureHeight)
metalTextureMap.rotation = Math.PI / 2
metalTextureMap.wrapS = RepeatWrapping
metalTextureMap.wrapT = RepeatWrapping
metalTextureMap.matrixAutoUpdate = true

export const metalTextureWide = loadTexture(imgUrlmetalTextureWide)
metalTextureWide.rotation = -Math.PI
metalTextureWide.wrapS = RepeatWrapping
metalTextureWide.wrapT = RepeatWrapping
metalTextureWide.matrixAutoUpdate = true

export const metalTextureWideMap = loadTexture(imgUrlmetalTextureWideMap)
metalTextureWideMap.rotation = -Math.PI
metalTextureWideMap.wrapS = RepeatWrapping
metalTextureWideMap.wrapT = RepeatWrapping
metalTextureWideMap.matrixAutoUpdate = true

export const woodTexture = loadTexture(imgUrlwoodTexture)
woodTexture.rotation = Math.PI / 2
woodTexture.wrapS = RepeatWrapping
woodTexture.wrapT = RepeatWrapping
woodTexture.matrixAutoUpdate = true

export const woodTextureMap = loadTexture(imgUrlwoodTextureMap)
woodTextureMap.rotation = Math.PI / 2
woodTextureMap.wrapS = RepeatWrapping
woodTextureMap.wrapT = RepeatWrapping
woodTextureMap.matrixAutoUpdate = true

export const woodTextureWide = loadTexture(imgUrlwoodTextureWide)
woodTexture.rotation = Math.PI / 2
woodTexture.wrapS = RepeatWrapping
woodTexture.wrapT = RepeatWrapping
woodTexture.matrixAutoUpdate = true

export const woodTextureWideMap = loadTexture(imgUrlwoodTextureWideMap)
woodTextureMap.rotation = Math.PI / 2
woodTextureMap.wrapS = RepeatWrapping
woodTextureMap.wrapT = RepeatWrapping
woodTextureMap.matrixAutoUpdate = true

export const grassTexture = loadTexture(imgUrlgrassTexture)
grassTexture.wrapS = RepeatWrapping
grassTexture.wrapT = RepeatWrapping
grassTexture.repeat.set(5, 5)
grassTexture.matrixAutoUpdate = true

export const concreteTexture = loadTexture(imgUrlconcreteTexture)
concreteTexture.wrapS = RepeatWrapping
concreteTexture.wrapT = RepeatWrapping
concreteTexture.repeat.set(3, 3)
concreteTexture.matrixAutoUpdate = true

const  cubeMapUrls = [
  imgCubemapSide,imgCubemapSide,
  imgCubemapTop,imgCubemapBtm,
  imgCubemapSide,imgCubemapSide
];
export const reflectionCube = new CubeTextureLoader().load(cubeMapUrls)

function loadTexture(url) {
  let texture = loader.load(
    url,
    function () {
      console.log('texture loaded')
    },
    function () {
      console.log('loading textures')
    },
    function (err) {
      console.log(err)
    },
  )
  return texture
}
