import { Scene, Fog, Color, Mesh, CircleGeometry, MeshStandardMaterial } from "three";
import { grassTexture } from "./materials";

export default function createScene() {
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 8, 20);
  scene.background = new Color(0xffffff);
  const ground = new Mesh(
    new CircleGeometry(5, 50),
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
