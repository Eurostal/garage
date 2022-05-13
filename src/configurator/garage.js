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
    this.walls = []
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

    let garage = new Group()
    garage.add(fundation)

    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        let wall = new Wall(
          this.width,
          this.height,
          this.length / 2,
          i * Math.PI,
        )
        this.walls.push(wall)
        garage.add(wall.object)
      } else {
        let wall = new Wall(
          this.length,
          this.height,
          this.width / 2,
          i * Math.PI + Math.PI / 2,
        )
        this.walls.push(wall)
        garage.add(wall.object)
      }
    }
    garage.add(new roofGable(this.width, this.length, this.height).object)

    return garage
  }

  UpdateGate(gateWidth, gateHeight, gateType) {
    this.object.remove(this.object.children[1])
    let frontWall = this.walls[1]
    if (gateType !== 'none') {
      frontWall = new WallGate(
        this.width,
        this.height,
        this.length / 2,
        0,
        gateWidth,
        gateHeight,
        gateType,
      )
      frontWall.addGate(gateType)
      this.walls[1] = frontWall
    } else {
      let frontWall = new Wall(this.width, this.height, this.length / 2, 0)
      this.walls[1] = frontWall
    }
    this.object.add(frontWall.object)
  }

  UpdateWall(index) {
    this.walls[i]
  }

  get garageParts() {
    return this.object.children
  }
}
