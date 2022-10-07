import { Vector3, VectorKeyframeTrack, AnimationClip, InterpolateSmooth, LoopOnce } from "three";

export default class CameraAnimator {
  constructor(camera, controls, mixer) {
    this.camera = camera;
    this.controls = controls;
    this.mixer = mixer;
    this.destination;

    this.mixer.addEventListener("finished", () => {
      console.log("finished");
      this.controls.minDistance = 5;
      this.controls.update();
      this.mixer.stopAllAction();
      this.camera.position.set(this.destination.x, this.destination.y, this.destination.z);
    });
  }

  moveCamera(wallId) {
    let actualPosition = this.camera.position;
    let destination = this._againstWallPosition(wallId);
    this.destination = destination;
    this.controls.minDistance = Math.sqrt(actualPosition.x ** 2 + (actualPosition.y - 1) ** 2 + actualPosition.z ** 2);
    this.controls.update();

    var positionKF = new VectorKeyframeTrack(
      ".position",
      [0, 2],
      [actualPosition.x, actualPosition.y, actualPosition.z, destination.x, destination.y, destination.z],
      InterpolateSmooth
    );
    var clip = new AnimationClip("Action", 2, [positionKF]);

    var clipAction = this.mixer.clipAction(clip);
    clipAction.clampWhenFinished = true;
    clipAction.setLoop(LoopOnce);
    clipAction.play();
  }

  _againstWallPosition(wallId) {
    switch (wallId) {
      case 0:
        return new Vector3(0, 2, 7);
      case 1:
        return new Vector3(0, 2, -7);
      case 2:
        return new Vector3(-7, 2, 0);
      case 3:
        return new Vector3(7, 2, 0);
      default:
        return new Vector3(-7, 4, 10);
    }
  }
}
