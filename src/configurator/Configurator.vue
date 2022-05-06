<template>
  <div id="scene-container"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { PerspectiveCamera, Scene, WebGLRenderer, GridHelper, Color, DirectionalLight, AmbientLight } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Wall from "./wall.js";

onMounted(() => {
  const container = document.getElementById("scene-container");
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.01, 1000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.minPolarAngle = Math.PI / 6;
  controls.maxPolarAngle = Math.PI / 2;
  controls.zoomSpeed = 0.8;

  camera.position.set(10, 3, 10);
  controls.update();
  scene.add(camera);

  const ambientLight = new AmbientLight(0xffffff);
  scene.add(ambientLight);
  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  directionalLight.position.x = 10;
  directionalLight.position.y = 5;
  directionalLight.position.z = 10;

  scene.add(directionalLight);

  const grid = new GridHelper(40, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  scene.background = new Color(0xdaf0f5);

  const test = new Wall(10, 5);
  scene.add(test.getObject);

  (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })();
});
</script>

<style scoped>
#scene-container {
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 16/9;
}
</style>
