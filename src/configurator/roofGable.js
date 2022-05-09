import {
  Group,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  MeshStandardMaterial,
} from 'three'
import * as Material from './materials'

export default class roofGable {
  constructor(width = 5, length = 5, wallsHeight = 2) {
    this.width = width
    this.length = length
    this.wallsHeight = wallsHeight
    this.object = this.createGables()
  }

  createGables() {
    let wallWidth = 0.01
    let gableGroup = new Group()
    let geometry = new BufferGeometry()
    let vertices = new Float32Array([
      -this.width / 2,
      this.wallsHeight,
      0,
      0,
      this.wallsHeight + 0.5,
      0,
      this.width / 2,
      this.wallsHeight,
      0,
    ])
    let uvs = new Float32Array([0, 0, 0.5, 0.25, 1, 0])
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
    geometry.computeVertexNormals()

    let tempTexture = Material.metalTexture.clone()
    tempTexture.repeat.set(this.wallsHeight, this.width)

    let gableFront = new Mesh(
      geometry,
      new MeshStandardMaterial({
        map: tempTexture,
        // normalMap: Material.metalTextureMap,
        metalness: 0.2,
        roughness: 0.5,
        side: DoubleSide,
      }),
    )
    let gableBack = gableFront.clone()

    gableFront.position.z = this.length / 2 + wallWidth / 2
    gableGroup.add(gableFront)

    gableBack.position.z = -this.length / 2 - wallWidth / 2
    gableBack.rotateY(Math.PI)
    gableGroup.add(gableBack)
    return gableGroup
  }
}
