import { BoxGeometry, Mesh, MeshStandardMaterial, Group } from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'
import * as gateModel from './gateFactory'

export default class Gate  {
  constructor(
    width,
    height,
    material,
    gateType = 'empty',
  ) {
    this.width = width
    this.height = height
    this.material = material
    this.gateType = gateType
    return this.selectGate(this.gateType)
  }

  selectGate(type) {
    switch (type) {
      case 'double':
        return gateModel.doubleDoor(this.width, this.height, this.material)
      default:
        return null
    }
  }
}
