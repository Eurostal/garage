import {
  Group,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  MeshStandardMaterial,
  Shape,
  ExtrudeGeometry,
  Vector2,
  Vector3,
} from 'three'
import * as Material from './materials'

//TODO : refactor
export default class roofGable {
  constructor(width = 5, length = 5, wallsHeight = 2) {
    this.width = width
    this.length = length
    this.wallsHeight = wallsHeight
    this.object = this.assembleRoof()
  }

  assembleRoof() {
    let gableGroup = new Group()
    let geometry = new BufferGeometry()
    let vertices = new Float32Array([
      -this.width / 2,
      this.wallsHeight,
      0,
      0,
      this.wallsHeight + 0.5,
      0,
      this.width / 2,
      this.wallsHeight,
      0,
    ])

    let uvs = new Float32Array([0, 0, 0.5, 0.25, 1, 0])
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
    geometry.computeVertexNormals()

    let tempTexture = Material.metalTexture.clone()
    tempTexture.repeat.set(this.wallsHeight, this.width)

    let gableFront = new Mesh(
      geometry,
      new MeshStandardMaterial({
        map: tempTexture,
        // normalMap: Material.metalTextureMap,
        metalness: 0.2,
        roughness: 0.5,
        side: DoubleSide,
      }),
    )

    let gableBack = gableFront.clone()

    gableFront.position.z = this.length / 2
    gableFront.receiveShadow = true
    gableFront.castShadow = true
    gableGroup.add(gableFront)

    gableBack.position.z = -this.length / 2
    gableBack.receiveShadow = true
    gableBack.rotateY(Math.PI)
    gableGroup.add(gableBack)

    // cloning first verticies as points on XY plane
    let roofPoints = []
    for (let i = 0; i < vertices.length; i += 3) {
      roofPoints.push(new Vector2(vertices[i], vertices[i + 1]))
    }

    // creating top roof layer from previous vectors
    for (let i = roofPoints.length - 1; i >= 0; i--) {
      let newPoint = roofPoints[i].clone()
      newPoint.y += 0.015
      roofPoints.push(newPoint)
    }

    let tempRoofTexture = Material.metalTexture.clone()
    tempRoofTexture.rotation = 0

    const roofShape = new Shape(roofPoints)
    const extrudeSettings = {
      depth: this.length,
      bevelEnabled: false,
    }
    const geometryRoof = new ExtrudeGeometry(roofShape, extrudeSettings)
    const roof = new Mesh(
      geometryRoof,
      new MeshStandardMaterial({
        map: tempRoofTexture,
        // normalMap: Material.metalTextureMap,
        metalness: 0.2,
        roughness: 0.6,
        side: DoubleSide,
      }),
    )
    roof.castShadow = true
    roof.position.z = (-this.length * 1.05) / 2
    roof.scale.set(1.05, 1.05, 1.05)
    roof.position.y = (-this.wallsHeight * 0.1) / 2 - 0.02

    gableGroup.add(roof)

    return gableGroup
  }
}
