import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'

import * as Material from './materials'

export default class Wall {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.object = new Mesh(
      new BoxGeometry(width, height, 0.1),
      new MeshStandardMaterial({
        map: Material.metalTexture,
        normalMap: Material.metalTextureMap,
        metalness: 0.1,
        roughness: 0.5,
      }),
    )
    this.object.position.y = this.height / 2
    this.object.castShadow = true
  }

  get getObject() {
    return this.object
  }
}
