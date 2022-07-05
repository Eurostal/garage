import WallElement from "./WallElement";
import { MeshStandardMaterial, MeshPhysicalMaterial, ExtrudeGeometry, Mesh, Group, BoxGeometry, Shape, DoubleSide, Vector2, Path } from "three";

export default class Window extends WallElement {
  constructor(width, height, material, name) {
    super(width, height, material, name);
    this.object = this.createWindow();
  }

  createWindow() {
    const windowShape = new Shape();
    windowShape.moveTo(0, 0);
    windowShape.lineTo(0, this.height);
    windowShape.lineTo(this.width, this.height);
    windowShape.lineTo(this.width, 0);

    const windowInnerPath = new Path();
    windowInnerPath.moveTo(0.05, 0.05);
    windowInnerPath.lineTo(0.05, this.height - 0.05);
    windowInnerPath.lineTo(this.width - 0.05, this.height - 0.05);
    windowInnerPath.lineTo(this.width - 0.05, 0.05);

    windowShape.holes = [windowInnerPath];

    const frameGeometry = new ExtrudeGeometry(windowShape, { depth: 0.06, bevelEnabled: false });
    const frameMesh = new Mesh(frameGeometry, this.material);
    frameMesh.receiveShadow = true;
    frameMesh.castShadow = true;
    frameMesh.translateX(-this.width / 2);
    frameMesh.translateZ(-0.03);

    const glassMesh = new Mesh(
      new BoxGeometry(this.width - 0.1, this.height - 0.1, 0.02),
      new MeshPhysicalMaterial({
        color: 0x4a6363,
        metalness: 0.3,
        roughness: 0.1,
        clearcoat: 1,
        transparent: true,
        opacity: 0.3,
        reflectivity: 1,
        side: DoubleSide,
      })
    );
    glassMesh.translateY(this.height / 2);

    const window = new Group();
    window.add(frameMesh);
    window.add(glassMesh);
    window.name = this.name;

    return window;
  }
}
