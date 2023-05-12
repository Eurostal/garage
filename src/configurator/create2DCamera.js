import { OrthographicCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function create2DCamera(container, renderer) {
    const FRUSTUM_SIZE = 5;
//   const FRUSTUM_SIZE = 10;
    const ASPECT = container.clientWidth / container.clientHeight ;

  const camera = new OrthographicCamera((FRUSTUM_SIZE * ASPECT) / -2, (FRUSTUM_SIZE * ASPECT) / 2, FRUSTUM_SIZE / 2, FRUSTUM_SIZE / -2, 0.001, 1000);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);

  return { camera, controls };
}
