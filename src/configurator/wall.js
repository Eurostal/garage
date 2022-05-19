import { Mesh, MeshStandardMaterial, BoxGeometry, DoubleSide } from 'three'
import * as Material from './materials'

export default class Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    this.width = width
    this.height = height
    this.offset = offset
    this.rotation = rotation

    let tempTexture = Material.metalTexture.clone()
    // let tempTextureMap = Material.metalTextureMap.clone()

    tempTexture.repeat.set(height, width) //keeping texture size fixed
    // tempTextureMap.repeat.set(height, width)

    this.material = new MeshStandardMaterial({
      map: tempTexture,
      // normalMap: Material.metalTextureMap,
      metalness: 0.2,
      roughness: 0.5,
      flatShading: true,
      side: DoubleSide,
    })

    this.object = this.createWall()
  }
  createWall() {
    let wall = new Mesh(
      new BoxGeometry(this.width, this.height, 0.01),
      this.material,
    )
    wall.name = 'WallBase'
    wall.position.y = this.height / 2
    wall.rotateY(this.rotation)
    wall.translateZ(this.offset - 0.01 / 2)
    wall.castShadow = true
    wall.receiveShadow = true
    return wall
  }
}
