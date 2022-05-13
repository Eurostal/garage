import Wall from './wall'
import { CSG } from '@enable3d/three-graphics/jsm/csg'

export default class WallCustom extends Wall {
  constructor(width, height, offset = 0, rotation = 0) {
    super(width, height, offset, rotation)
    this.object = this.createWall()
  }

  punchHole(x, y, width, height) {
    let subtractMesh = new Mesh(
      new BoxGeometry(width, height, 0.05),
      new MeshStandardMaterial(),
    )
    subtractMesh.position.y = this.height / 2
    subtractMesh.position.z = this.offset

    let wallPrepared = CSG.subtract(this.object, subtractMesh)

    wallPrepared.material = this.material
    wallPrepared.castShadow = true
    wallPrepared.receiveShadow = true

    return wallPrepared
  }
}
