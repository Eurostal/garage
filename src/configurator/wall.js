import { Mesh, MeshStandardMaterial, BoxGeometry, DoubleSide } from 'three'
import * as Material from './materials'

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    this.width = width
    this.height = height
    this.offset = offset

    let tempTexture = Material.metalTexture.clone()
    // let tempTextureMap = Material.metalTextureMap.clone()

    tempTexture.repeat.set(height, width) //keeping texture size fixed
    // tempTextureMap.repeat.set(height, width)
    this.texture = tempTexture

    let wall = new Mesh(
      new BoxGeometry(width, height, 0.01),
      new MeshStandardMaterial({
        map: tempTexture,
        // normalMap: Material.metalTextureMap,
        metalness: 0.2,
        roughness: 0.5,
        flatShading: true,
        side: DoubleSide,
      }),
    )
    wall.position.y = this.height / 2
    wall.rotateY(rotation)
    wall.translateZ(offset - 0.01 / 2)
    wall.castShadow = true
    wall.receiveShadow = true

    this.object = wall
  }
}
