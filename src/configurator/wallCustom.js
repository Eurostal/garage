import Wall from './wall'
import {Mesh,BoxGeometry,MeshStandardMaterial,Group} from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'
import Gate from './gate'

export default class WallCustom extends Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    super(width, height, offset, rotation)
    this.initCustomWall = this.createWall()
    this.initCustomWall.name = "WallCustom"
    this.object = new Group().add(this.initCustomWall)
    this.holes = new Group()
  }

  addGate(width, height, type, elementId, xOffset){
    let gate = new Gate(width,height,this.material,type).object
    if (gate !== null) {
      gate.rotateY(this.rotation)
      gate.translateZ(this.offset)
      gate.translateX(-this.width/2 + width/2 + xOffset)
      gate.position.y = height/2
      gate.name = elementId
      this.object.add(gate)
    }
    this.addHole(width, height, elementId, xOffset,height/2) 
  }

  addHole(width, height, elementId, xOffset,yOffset) {
    let subtractMesh = new Mesh(
      new BoxGeometry(width, height, 0.05),
      new MeshStandardMaterial(),
    )
    subtractMesh.rotateY(this.rotation)
    subtractMesh.translateZ(this.offset)
    subtractMesh.translateX(-this.width/2 + width/2 + xOffset)
    subtractMesh.position.y = yOffset
    subtractMesh.name = elementId

    this.holes.add(subtractMesh)
    this.punchHoles()
  }

  removeElement(elementId){
    this.object.remove(this.object.getObjectByName(elementId))
    this.removeHole(elementId)
  }

  removeHole(elementId){
    // for hole removal wall needs to be reinitialized
    this.object.remove(this.object.getObjectByName("WallCustom"))
    this.object.add(this.initCustomWall)
    this.holes.remove(this.holes.getObjectByName(elementId))
    this.punchHoles()
  }

  punchHoles(){
    let wallPunched = null
    for (let i = 0; i < this.holes.children.length; i++) {
      
      wallPunched = CSG.subtract(this.object.getObjectByName("WallCustom"), this.holes.children[i])
    }

    wallPunched.material = this.material
    wallPunched.castShadow = true
    wallPunched.receiveShadow = true
    wallPunched.name = "WallCustom"
    
    this.object.remove(this.object.getObjectByName("WallCustom"))
    this.object.add(wallPunched)
  }
}
