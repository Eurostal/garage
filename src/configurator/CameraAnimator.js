import { Vector3, VectorKeyframeTrack, AnimationClip, AnimationMixer, InterpolateSmooth, LoopOnce } from "three";

export default class CameraAnimator {
  constructor(camera, controls, mixer) {
    this.camera = camera;
    this.controls = controls;
    this.mixer = mixer;
  }

  moveCamera(wallId) {
    const actualPosition = this.camera.position;
    const destination = this._againstWallPosition(wallId);
    this.controls.minDistance = Math.sqrt(actualPosition.x ** 2 + (actualPosition.y - 1) ** 2 + actualPosition.z ** 2);
    this.controls.update();

    const positionKF = new VectorKeyframeTrack(
      ".position",
      [0, 2],
      [actualPosition.x, actualPosition.y, actualPosition.z, destination.x, destination.y, destination.z],
      InterpolateSmooth
    );
    const clip = new AnimationClip("Action", 2, [positionKF]);

    this.mixer = new AnimationMixer(this.camera);
    this.mixer.addEventListener("finished", () => {
      console.log("finished");
      this.controls.minDistance = 5;
      this.controls.update();
      this.camera.position.set(destination.x, destination.y, destination.z);
    });

    const clipAction = this.mixer.clipAction(clip);
    clipAction.clampWhenFinished = true;
    clipAction.setLoop(LoopOnce);
    clipAction.play();
  }

  _againstWallPosition(wallId) {
    switch (wallId) {
      case 0:
        return new Vector3(0, 2, 8);
      case 1:
        return new Vector3(0, 2, -8);
      case 2:
        return new Vector3(-8, 2, 0);
      case 3:
        return new Vector3(8, 2, 0);
      default:
        return new Vector3(-8, 4, 10);
    }
  }
}
