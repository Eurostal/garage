import { Mesh, BoxGeometry, MeshBasicMaterial, TextureLoader } from 'three'

export default class Wall {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.object = new Mesh(
      new BoxGeometry(width, height, 1),
      new MeshBasicMaterial({ color: 0xffffff }),
    )
  }

  get getObject() {
    return this.object
  }
}
