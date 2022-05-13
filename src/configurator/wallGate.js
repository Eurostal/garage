import Wall from './wall.js'
import { BoxGeometry, Mesh, MeshStandardMaterial, DoubleSide } from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'

export default class wallGate extends Wall {
  constructor(
    width,
    height,
    offset,
    rotation,
    gateWidth = 2,
    gateHeight = 2,
    gateType = 'empty',
  ) {
    super(width, height, offset, rotation)
    this.gateWidth = gateWidth
    this.gateHeight = gateHeight
    this.gateType = gateType

    this.object = this.cutWall(this.createWall())
  }

  cutWall(fullWall) {
    let subtractMesh = new Mesh(
      new BoxGeometry(this.gateWidth, this.gateHeight, 0.05),
      new MeshStandardMaterial(),
    )
    subtractMesh.position.y = this.height / 2 - 0.01
    subtractMesh.position.z = this.offset

    let wallPrepared = CSG.subtract(fullWall, subtractMesh)

    wallPrepared.material = this.material
    wallPrepared.castShadow = true
    wallPrepared.receiveShadow = true

    return wallPrepared
  }
}
