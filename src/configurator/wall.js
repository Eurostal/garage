import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
import * as Material from './materials'

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    this.width = width
    this.height = height

    Material.metalTexture.repeat.set(height, width) //keeping texture size fixed
    Material.metalTextureMap.repeat.set(height, width)

    this.object = new Mesh(
      new BoxGeometry(width, height, 0.01),
      new MeshStandardMaterial({
        map: Material.metalTexture,
        // normalMap: Material.metalTextureMap,
        metalness: 0.2,
        roughness: 0.5,
        flatShading: true,
      }),
    )
    this.object.position.y = this.height / 2
    this.object.rotateY(rotation)
    this.object.translateZ(offset)
    this.object.castShadow = true
  }
}
