import Wall from './wall.js'
import { BoxGeometry, Mesh, MeshStandardMaterial, DoubleSide } from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'

export default class wallGate extends Wall {
  constructor(width, height, offset = 0, rotation = 0, gateWidth = 2) {
    super(width, height, offset, rotation)
    this.gateWidth = gateWidth
    let wall = this.object

    let subtractMesh = new Mesh(
      new BoxGeometry(this.gateWidth, this.height, 0.05),
      new MeshStandardMaterial(),
    )

    subtractMesh.position.y = this.height / 2 - 0.01
    subtractMesh.position.z = this.offset
    let wallPrepared = CSG.subtract(wall, subtractMesh)
    console.log(wallPrepared)

    wallPrepared.material = new MeshStandardMaterial({
      map: this.texture,
      // normalMap: Material.metalTextureMap,
      metalness: 0.2,
      roughness: 0.5,
      flatShading: true,
      side: DoubleSide,
    })
    wallPrepared.castShadow = true
    wallPrepared.receiveShadow = true

    this.object = wallPrepared
  }
}
