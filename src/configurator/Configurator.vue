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

  const test = new Garage(6, 5, 2);
  scene.add(test.object);

  test.UpdateWall(0);
  test.walls[0].addElement(
    new Gate(
      2,
      2,
      new MeshStandardMaterial({
        map: Material.metalTexture,
        metalness: 0.2,
        roughness: 0.5,
        flatShading: true,
        side: DoubleSide,
      }),
      "gate1",
      "double"
    ),
    1,
    0
  );

  test.UpdateWall(2).addElement(new Window(1, 0.7, "window1"), 0.5, 1);
  test.walls[0].addElement(new Window(1, 1, "window2"), 4.5, 1);

  test.walls[2].addElement(
    new Door(
      1,
      1.88,
      new MeshStandardMaterial({
        map: Material.metalTexture,
        metalness: 0.2,
        roughness: 0.5,
        flatShading: true,
        side: DoubleSide,
      }),
      "door1"
    ),
    2.5,
    0
  );

  // test.walls[0].addGate(2,2,'double','gate2',3.1);
  // console.log(test.walls[0]);
  // test.walls[0].addHole("test2",4,1,1,1);
  // setTimeout(function (){
  //   test.walls[0].removeElement("gate1");
  // },10000);

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
