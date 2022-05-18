import { Group, Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
import Wall from './wall.js'
import WallGate from './wallGate'
import WallCustom from './wallCustom'
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

  CreateWalls() {
    for (let i = 0; i < 4; i++) {
      if (i < 2) {
        let wall = new Wall(
          this.width,
          this.height,
          this.length / 2,
          i * Math.PI,
        )
        this.walls.push(wall)
      } else {
        let wall = new Wall(
          this.length,
          this.height,
          this.width / 2,
          i * Math.PI + Math.PI / 2,
        )
        this.walls.push(wall)
      }
    }
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

    let roof = new roofGable(this.width, this.length, this.height).object

    this.CreateWalls()

    let garage = new Group()

    for (let i = 0; i < this.walls.length; i++) {
      garage.add(this.walls[i].object)
    }
    garage.add(fundation)
    garage.add(roof)

    return garage
  }

  UpdateWall(index) {
    let previous = this.walls[index]
    this.walls[index] = new WallCustom(
      previous.width,
      previous.height,
      previous.offset,
      previous.rotation,
    )
    this.object.remove(this.object.children[index])
    this.object.children.splice(index, 0, this.walls[index].object)
    
    return this.walls[index]
  }

  UpdateGate(gateWidth, gateHeight, gateType) {
    let frontWall = this.walls[0]
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
        this.walls[0] = frontWall
      } else {
        let frontWall = new Wall(this.width, this.height, this.length / 2, 0)
        this.walls[0] = frontWall
      }
    this.object.remove(this.object.children[0])
    this.object.children.splice(0, 0, frontWall.object)
  }

  get garageParts() {
    return this.object.children
  }
}
