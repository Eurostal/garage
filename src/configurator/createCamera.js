import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function createCamera(container, renderer) {
  const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.01, 1000);
  camera.position.set(-8, 4, 10);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 8;
  controls.minPolarAngle = Math.PI / 6;
  controls.maxPolarAngle = Math.PI / 2;
  controls.zoomSpeed = 0.8;
  controls.update();

  return camera;
}
