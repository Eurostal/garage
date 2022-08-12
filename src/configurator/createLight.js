import { AmbientLight, DirectionalLight, Group } from "three";

export default function createLight() {
  const lights = new Group();
  const ambientLight = new AmbientLight(0xffffff);
  lights.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.position.x = 10;
  directionalLight.position.y = 5;
  directionalLight.position.z = 10;
  directionalLight.castShadow = true;
  lights.add(directionalLight);

  return lights;
}
