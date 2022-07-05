<template>
  <div id="scene-container"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { MeshStandardMaterial } from "three";

import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import createScene from "./createScene";
import createLight from "./createLight";

import * as Texture from "./textures";
import * as Material from "./materials";
import Garage from "./garage.js";
import Gate from "./gate";
import Window from "./window";
import Door from "./door";
import { DoubleSide } from "three";

onMounted(() => {
  const container = document.getElementById("scene-container");

  const renderer = createRenderer(container);
  const scene = createScene();
  const camera = createCamera(container, renderer);
  const lights = createLight();

  scene.add(camera);
  scene.add(lights);

  const test = new Garage(6, 5, 2.15);
  scene.add(test.object);

  test.walls[0].addElement(new Gate(2, 2, Material.RAL6005, "gate1", "double"), 1, 0);
  test.walls[1].addElement(new Window(1, 1, Material.WHITE, "window2"), 0.5, 1);
  test.walls[2].addElement(new Window(1, 0.7, Material.GRAY, "window1"), 0.5, 1);
  test.walls[0].addElement(new Window(1, 1, Material.BROWN, "window3"), 4.5, 1);
  test.fittings.create();
  test.UpdateRoof();
  test.fittings.updateMaterial(Material.RAL6005);
  test.walls[2].addElement(new Door(1, 1.88, Material.RAL1002_H, "door1"), 2.5, 0);
  test.walls.forEach((wall) => wall.updateMaterial(Material.RAL1002_H));
  test.roof.updateMaterial(Material.RAL6005);

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
