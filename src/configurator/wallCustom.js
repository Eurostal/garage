import Wall from './wall'
import { Mesh, BoxGeometry, MeshStandardMaterial, Group } from 'three'
import { CSG } from '@enable3d/three-graphics/jsm/csg'

export default class WallCustom extends Wall {
  constructor(
    width,
    height,
    offset = 0,
    rotation = 0,
    clippingPlane,
    material,
    roofHeight,
  ) {
    super(width, height, offset, rotation, clippingPlane, material, roofHeight)
    const initCustomWall = this.createWall()
    initCustomWall.name = 'wall'
    this.object = new Group().add(initCustomWall)
    this.holes = new Group()
    this.elements = {}
  }

  addElement(
    element,
    xOffset = this.width / 2 - element.width / 2,
    yOffset = 0,
  ) {
    this.elements[element.name] = {
      x: xOffset,
      y: yOffset,
      width: element.width,
      height: element.height,
    }
    let elementObject = element.object
    if (element.object !== null) {
      elementObject.rotateY(this.rotation)
      elementObject.translateZ(this.offset - 0.005)
      elementObject.translateX(-this.width / 2 + element.width / 2 + xOffset)
      elementObject.translateY(yOffset)
      this.object.add(elementObject)
    }
    this.addHole(
      element.width,
      element.height,
      element.object.name,
      xOffset,
      element.height / 2 + yOffset,
    )
  }

  addHole(width, height, elementId, xOffset, yOffset) {
    let subtractMesh = new Mesh(
      new BoxGeometry(width, height, 0.1),
      new MeshStandardMaterial(),
    )
    subtractMesh.rotateY(this.rotation)
    subtractMesh.translateZ(this.offset)
    subtractMesh.translateX(-this.width / 2 + width / 2 + xOffset)
    subtractMesh.position.y = yOffset
    subtractMesh.name = elementId

    this.holes.add(subtractMesh)
    this.punchHoles()
  }

  removeElement(elementId) {
    const element = this.object.getObjectByName(elementId)
    if (element !== undefined) {
      delete this.elements[elementId]
      this.object.remove(element)
      this.removeHole(elementId)
      console.log('element removed! -', elementId)
    }
  }

  removeHole(elementId) {
    // for hole removal wall needs to be reinitialized
    this.holes.remove(this.holes.getObjectByName(elementId))
    const initCustomWall = this.createWall()
    initCustomWall.name = 'wall'
    this.object.remove(this.object.getObjectByName('wall'))
    this.object.add(initCustomWall)
    if (this.holes.children.length > 0) {
      this.punchHoles()
    }
  }

  punchHoles() {
    let wallPunched = this.createWall()
    for (let i = 0; i < this.holes.children.length; i++) {
      wallPunched = CSG.subtract(wallPunched, this.holes.children[i])
    }
    wallPunched.material = this.material
    wallPunched.castShadow = true
    wallPunched.receiveShadow = true
    this.object.remove(this.object.getObjectByName('wall'))
    wallPunched.name = 'wall'
    this.object.add(wallPunched)
  }

  // checkBoundaries(element, xOffset, yOffset) {
  //   if (element instanceof Gate) {
  //     yOffset = 0;
  //     if (element.gateType == "tilted" && element.height >= this.height - 0.2) {
  //       console.log(element.name + " is tilted gate, which needs 20cm gap from roof start, reduced to: " + (this.height - 0.2));
  //       element.height = this.height - 0.2;
  //       element.updateModel();
  //     }
  //   }

  //   if (xOffset < 0.1) {
  //     console.log(element.name + " item xOffset is out of wall's bounds ");
  //     return false;
  //   }

  //   if (xOffset > this.width - element.width - 0.1) {
  //     console.log(element.name + " item xOffset is out of wall's bounds ");
  //     return false;
  //   }

  //   if (yOffset > this.height - element.height) {
  //     console.log(element.name + " item yOffset is out of wall's bounds ");
  //     return false;
  //   }
  //   if (yOffset < 0) {
  //     console.log(element.name + " item yOffset is out of wall's bounds ");
  //     return false;
  //   }

  //   return true;
  // }
}
