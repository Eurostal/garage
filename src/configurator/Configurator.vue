<template>
  <div id="scene-container"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";

import createRenderer from "./createRenderer";
import createCamera from "./createCamera";
import createScene from "./createScene";
import createLight from "./createLight";

import * as Material from "./materials";
import Garage from "./Garage.js";
import Gate from "./Gate.js";
import Window from "./Window.js";
import Door from "./Door.js";

onMounted(() => {
  const container = document.getElementById("scene-container");

  const renderer = createRenderer(container);
  const scene = createScene();
  const camera = createCamera(container, renderer);
  const lights = createLight();

  scene.add(camera);
  scene.add(lights);

  const test = new Garage(2.95, 5, 2, Material.RAL9010);
  scene.add(test.object);

  test.walls[0].addElement(new Gate(2.95, 2, Material.RAL9010, "gate1", "double"), 0, 0);
  // test.walls[0].addElement(new Gate(2, 2, Material.WOOD_DARK_SHINE_H, "gate2", "double"), 3.2, 0);
  // test.walls[1].addElement(new Window(1, 1, Material.WHITE, "window2"), 0.5, 1);
  // test.walls[2].addElement(new Window(1, 0.7, Material.GRAY, "window1"), 0.5, 1);
  // test.walls[3].addElement(new Window(1, 0.7, Material.BROWN), 0.5, 1);
  // test.walls[0].addElement(new Window(1, 1, Material.BROWN, "window3"), 4.5, 1);
  // test.fittings.create();
  // test.updateRoof("left");
  // test.fittings.updateMaterial(Material.RAL9010);
  // test.walls[2].addElement(new Door(1, 1.88, Material.WOOD_DARK_SHINE, "door1"), 2.5, 0);
  // test.roof.updateMaterial(Material.RAL3011);
  // test.updateRoof("back");
  // test.updateMaterial(Material.WOOD_LIGHT);
  // test.updateRoof("");

  (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  })();
});
</script>

<style>
#scene-container {
  position: absolute;
  bottom: 50px;
  width: 100%;
  max-width: 1500px;
  aspect-ratio: 4/3;
}
</style>
