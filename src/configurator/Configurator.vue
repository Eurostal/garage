<template>
  <div class="configurator-container">
    <Emitter />
    <div id="scene-container"></div>
    <div class="alert" :class="{ active: message.length > 0 }">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import Emitter from "./Emitter.vue";
import { onMounted, computed } from "@vue/runtime-core";
import { generator } from "./Generator";
import { useStore } from "vuex";

import createRenderer from "./createRenderer";
import createCamera from "./createCamera";

import { MathUtils } from "three";

const store = useStore();
const message = computed(() => store.getters.getMessage);

onMounted(() => {
  const container = document.getElementById("scene-container");
  const scene = generator.getScene();
  const renderer = createRenderer(container);
  const { camera, controls } = createCamera(container, renderer);

  scene.add(camera);

  window.addEventListener("resize", function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.fov = MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(75) * 0.5) / camera.aspect));
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  renderer.setAnimationLoop(function () {
    renderer.render(scene, camera);
    controls.update();
  });
});
</script>

<style>
div.tm-has-options.product {
  width: 100%;
}

div.summary.entry-summary.tc-init {
  margin: 0 auto;
}

#app {
  width: 100vw;
  height: 30vh;
  z-index: 30;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  box-shadow: 0px 10px 10px 0px rgb(10 10 10 / 10%);
}

.configurator-container {
  width: 100%;
  position: relative;
  height: 100%;
}

@media only screen and (min-width: 768px) {
  #app {
    width: 100vw;
    height: 42vh;
    z-index: 30;
    padding: 0 20%;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    box-shadow: 0px 10px 10px 0px rgb(10 10 10 / 10%);
  }
}

@media only screen and (min-width: 1200px) {
  div.tm-has-options.product {
    width: 50%;
  }

  #app {
    padding: 0;
    height: auto;
    width: 50%;
    z-index: 10;
    background: #f8f8f8;
    margin: 0;
    box-shadow: none;
  }

  #scene-container {
    height: 100%;
    max-height: 600px;
    width: 100%;
    aspect-ratio: 1/1;
  }
}

.alert {
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(255, 0, 0, 0.5);
  max-width: 200px;
  padding: 0px 15px;
  border: 1px solid red;
  border-radius: 10px;
  opacity: 0;
  transition: all 0.2s;
}

.alert.active {
  opacity: 100%;
}

.alert p {
  font-family: sans-serif;
  font-size: 16px;
}
</style>
