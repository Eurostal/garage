import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  DoubleSide,
} from 'three'
import * as Material from './materials'

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    this.width = width
    this.height = height

    let tempTexture = Material.metalTexture.clone()
    // let tempTextureMap = Material.metalTextureMap.clone()

    tempTexture.repeat.set(height, width) //keeping texture size fixed
    // tempTextureMap.repeat.set(height, width)

    this.object = new Mesh(
      new PlaneGeometry(width, height),
      new MeshStandardMaterial({
        map: tempTexture,
        // normalMap: Material.metalTextureMap,
        metalness: 0.2,
        roughness: 0.5,
        flatShading: true,
        side: DoubleSide,
      }),
    )
    this.object.position.y = this.height / 2
    this.object.rotateY(rotation)
    this.object.translateZ(offset)
    this.object.castShadow = true
    this.object.receiveShadow = true
  }
}
