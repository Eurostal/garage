import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import create2DCamera from "./create2DCamera";
import { GridHelper ,Object3D,Vector3 } from "three";

const SNAP_WIDTH = 1200;
const SNAP_HEIGHT = 1000;
const CAMERA_POSITIONS = [new Vector3(-7, 3, 7), new Vector3(7, 3, 7),new Vector3(7, 3,-7), new Vector3(-7, 3, -7)];

export default function snapSides(generator,submitEvent) {

  
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
      setImgFile(renderer, i, submitEvent)
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

}

function createTempContainer(width,height){
  const container = document.createElement("div");
  container.id = "temp-renderer-container";
  container.style.width = width + "px";
  container.style.height = height + "px";
  document.body.appendChild(container);

  return container
}

function setImgFile(renderer,index,submitter) {
    const fileNames = ['front','right','back','left']
    let base64Image = renderer.domElement.toDataURL("image/jpeg");
    base64Image = base64Image.split(',')[1];

    renderer.domElement.toBlob((blob)=>{
      let file = new File([blob], `${fileNames[index]}.jpg`, { type: "image/jpeg" });

      let dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      let input = document.querySelector(`[name="product-image-${index + 1}"]`);
      input.files = dataTransfer.files;
      
      if (index == CAMERA_POSITIONS.length - 1) {
        document.dispatchEvent(new CustomEvent('snapsGenerated'))
      }
      
    },"image/jpeg",1)
}



