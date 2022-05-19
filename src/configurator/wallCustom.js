import Wall from './wall'
import {Mesh,BoxGeometry,MeshStandardMaterial,Group} from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'

export default class WallCustom extends Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    super(width, height, offset, rotation)
    this.initCustomWall = this.createWall()
    this.initCustomWall.name = "WallCustom"
    this.object = new Group().add(this.initCustomWall)
    this.holes = new Group()
  }

  addHole(elementId, xOffset,yOffset, width, height) {
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

  removeHole(elementId){
    // for hole removal wall needs to be reinitialized
    this.object.remove(this.object.children[0])
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
    
    this.object.remove(this.object.children[0])
    this.object.add(wallPunched)
  }
}
