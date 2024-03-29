import { Scene, Color, Mesh, CircleGeometry, MeshStandardMaterial } from "three";
import { grassTexture } from "./textures";

export default function createScene() {
  const scene = new Scene();
  scene.background = new Color(0xf8f8f8);
  const ground = new Mesh(
    new CircleGeometry(6, 50),
    new MeshStandardMaterial({
      map: grassTexture,
    })
  );
  ground.rotateX(-Math.PI / 2);
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  scene.add(ground);

  return scene;
}
