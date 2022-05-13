import { Group, Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
import Wall from './wall.js'
import WallGate from './wallGate'
import roofGable from './roofGable'
import * as Material from './materials'

export default class Garage {
  constructor(width = 5, length = 5, height = 2) {
    this.width = width
    this.length = length
    this.height = height
    this.object = this.CreateGarage()
  }

  CreateGarage() {
    let fundation = new Mesh(
      new BoxGeometry(this.width + 0.2, 0.1, this.length + 0.2),
      new MeshStandardMaterial({
        map: Material.concreteTexture,
      }),
    ).translateY(-0.05)

    fundation.castShadow = true
    fundation.receiveShadow = true

    let wallsAndFundation = new Group()
    wallsAndFundation.add(fundation)
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        wallsAndFundation.add(
          new Wall(this.width, this.height, this.length / 2, i * Math.PI)
            .object,
        )
      } else {
        wallsAndFundation.add(
          new Wall(
            this.length,
            this.height,
            this.width / 2,
            i * Math.PI + Math.PI / 2,
          ).object,
        )
      }
    }
    wallsAndFundation.add(
      new roofGable(this.width, this.length, this.height).object,
    )
    return wallsAndFundation
  }

  UpdateGate(gateWidth, gateHeight, gateType) {
    let frontWall = this.object.children[1]
    this.object.remove(frontWall)
    this.object.add(
      new WallGate(
        this.width,
        this.height,
        this.length / 2,
        0,
        gateWidth,
        gateHeight,
        gateType,
      ).object,
    )
  }

  get garageParts() {
    return this.object.children
  }
}
