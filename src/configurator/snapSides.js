import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import create2DCamera from "./create2DCamera";
import { GridHelper ,Object3D,Vector3 } from "three";
import { h } from "vue";

const SNAP_WIDTH = 600;
const SNAP_HEIGHT = 550;

export default function snapSides(generator) {

  const CAMERA_POSITIONS = [new Vector3(-7, 3, 7), new Vector3(7, 3, 7),new Vector3(7, 3,-7), new Vector3(-7, 3, -7)];

  const container = createTempContainer(SNAP_WIDTH, SNAP_HEIGHT)
  const renderer = createRenderer(container);
  const {camera,controls} = createCamera(container,renderer)
  const scene = generator.getScene();
  scene.add(camera);

  // const centerPivot = new Object3D()
  // scene.add(centerPivot)

  // const grid= new GridHelper(10,10)
  // grid.rotateX(Math.PI/2)
  // grid.position.y = 5
  // grid.position.z = -20
  // centerPivot.add(grid)

  let i = 0;
  
  (function moveCamera() {
    camera.position.set(...CAMERA_POSITIONS[i]);
    controls.update();
    renderer.render(scene, camera);
    createImgElement(renderer,SNAP_WIDTH,SNAP_HEIGHT)
    i++;
    if (i < CAMERA_POSITIONS.length) {
      // centerPivot.rotateY((Math.PI / 2))
      moveCamera();
    }else{
      // scene.remove(centerPivot)
    }
  })();

  renderer.dispose();
  container.remove();
  return true;
}

function createTempContainer(width,height){
  const container = document.createElement("div");
  container.id = "temp-renderer-container";
  container.style.width = width + "px";
  container.style.height = height + "px";
  document.body.appendChild(container);

  return container
}

function createImgElement(renderer,width,height) {
  let dataUrl = renderer.domElement.toDataURL("image/jpeg");
    console.log(dataUrl);

  const imgElement = document.createElement('img')
  imgElement.width = width
  imgElement.height = height
  imgElement.src = dataUrl
  document.body.append(imgElement)
}

