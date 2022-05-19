import WallElement from './wallElement'
import * as gateModel from './gateFactory'

export default class Gate extends WallElement  {
  constructor(
    width,
    height,
    material,
    gateType = 'empty',
  ) {
    super(width,height,material)
    this.gateType = gateType
    this.object = this.createGate(this.gateType)
  }

  createGate(type) {
    switch (type) {
      case 'double':
        return gateModel.doubleDoor(this.width, this.height, this.material)
      default:
        return null
    }
  }
}
