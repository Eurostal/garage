import { TextureLoader, RepeatWrapping } from 'three'

const loader = new TextureLoader()

export const metalTexture = loadTexture(
  'http://localhost:3000/src/assets/texture1.png',
)
metalTexture.rotation = 1.57079633
metalTexture.wrapS = RepeatWrapping
metalTexture.wrapT = RepeatWrapping
metalTexture.repeat.set(3, 3)
metalTexture.matrixAutoUpdate = true

export const metalTextureMap = loadTexture(
  'http://localhost:3000/src/assets/texture1map.png',
)
metalTextureMap.rotation = 1.57079633
metalTextureMap.wrapS = RepeatWrapping
metalTextureMap.wrapT = RepeatWrapping
metalTextureMap.repeat.set(3, 3)
metalTextureMap.matrixAutoUpdate = true

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
