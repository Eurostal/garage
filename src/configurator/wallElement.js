export default class WallElement {
    constructor(
        width,
        height,
        material,
        name = 'unnamed wall object'
      ){
          this.width = width
          this.height = height
          this.material = material
          this.name = name
      }

}