import {
  Mesh,
  PlaneGeometry,
  BoxGeometry,
  Group,
  MeshStandardMaterial,
} from 'three'

const handle = new Group()
const handlePart = new Mesh(
  new BoxGeometry(0.02, 0.1, 0.01),
  new MeshStandardMaterial({
    color: 0x000000,
  }),
)
handlePart.position.z = 0.01

const handlePart2 = handlePart.clone()
handlePart2.rotateZ(Math.PI / 2)
handlePart2.position.z = 0.02
handlePart2.position.x = 0.05
handle.add(handlePart, handlePart2)
handle.position.x = 0.1

export const doubleDoor = function createDoubleDoor(width, height, material) {
  let doorGroup = new Group()

  let door = new Mesh(new PlaneGeometry(width, height), material)
  door.castShadow = true
  door.receiveShadow = true

  let separator = new Mesh(
    new PlaneGeometry(0.02, height),
    new MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5,
    }),
  )
  separator.position.z = 0.001

  doorGroup.add(separator, door, handle)
  doorGroup.position.y = height / 2

  return doorGroup
}
