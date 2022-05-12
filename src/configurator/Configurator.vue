<template>
  <div id="scene-container"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  CircleGeometry,
  MeshStandardMaterial,
  Color,
  Fog,
  DirectionalLight,
  PCFSoftShadowMap,
  AmbientLight,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as Material from "./materials";
import Wall from "./wall.js";
import Garage from "./garage.js";

onMounted(() => {
  const container = document.getElementById("scene-container");
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new Scene();

  const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.01, 1000);
  camera.position.set(-8, 4, 10);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 8;
  controls.minPolarAngle = Math.PI / 6;
  controls.maxPolarAngle = Math.PI / 2;
  controls.zoomSpeed = 0.8;
  controls.update();

  const ambientLight = new AmbientLight(0xffffff);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 0.8);
  directionalLight.position.x = 10;
  directionalLight.position.y = 5;
  directionalLight.position.z = 10;
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  scene.fog = new Fog(0xffffff, 8, 20);
  scene.background = new Color(0xffffff);

  const ground = new Mesh(
    new CircleGeometry(5, 50),
    new MeshStandardMaterial({
      map: Material.grassTexture,
    })
  );
  ground.rotateX(-Math.PI / 2);
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  scene.add(ground);

  // const test = new Wall(5, 2);
  const test = new Garage(7, 5, 2);
  scene.add(test.object);

  (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })();
});
</script>

<style scoped>
#scene-container {
  position: absolute;
  bottom: 50px;
  width: 100%;
  max-width: 1500px;
  aspect-ratio: 4/3;
}
</style>
