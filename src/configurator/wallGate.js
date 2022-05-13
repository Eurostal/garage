import Wall from './wall.js'
import { BoxGeometry, Mesh, MeshStandardMaterial, Group } from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'
import * as Gate from './gateFactory'

export default class WallGate extends Wall {
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

    this.object = new Group().add(this.cutWall(this.createWall()))
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

  addGate(type) {
    if (this.object.children.length > 1)
      this.object.remove(this.object.children[1])

    if (type !== 'none') {
      let gate = this.selectGate(type)
      gate.position.z = this.offset - 0.01
      this.object.add(gate)
    }
  }

  selectGate(type) {
    switch (type) {
      case 'double':
        return Gate.doubleDoor(this.gateWidth, this.gateHeight, this.material)
      default:
        return Gate.doubleDoor(this.gateWidth, this.gateHeight, this.material)
    }
  }
}
