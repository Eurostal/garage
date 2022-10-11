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

import { MathUtils, Clock } from "three";

const store = useStore();
const message = computed(() => store.getters.getMessage);
const clock = new Clock();

onMounted(() => {
  const container = document.getElementById("scene-container");
  const scene = generator.getScene();
  const renderer = createRenderer(container);
  const cameraCreator = createCamera(container, renderer);

  const camera = cameraCreator.camera;
  const controls = cameraCreator.controls;
  scene.add(camera);

  generator.createAnimator(camera, controls);

  window.addEventListener("resize", function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.fov = MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(75) * 0.5) / camera.aspect));
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  renderer.setAnimationLoop(function () {
    const delta = clock.getDelta();
    const mixer = generator.cameraAnimator.getMixer();
    if (mixer) {
      mixer.update(delta);
    }

    controls.update();
    renderer.render(scene, camera);
  });

  const resetBtn = document.querySelector(".reset-btn-div span");
  if (resetBtn) resetBtn.addEventListener("click", () => location.reload());
});
</script>

<style>
.tm-extra-product-options ul.tmcp-elements li.tmcp-field-wrap.tc-mode-startimages .checkbox-image.checkbox-image,
.tm-extra-product-options ul.tmcp-elements li.tmcp-field-wrap.tc-mode-startimages .radio-image {
  max-height: 80px !important;
  width: 80px !important;
  object-fit: contain;
  margin-left: 20px;
  padding: 0px;
}

.reset-btn-div span {
  border: 1px solid #cc0d27;
  color: #cc0d27 !important;
  margin-top: 1.125rem !important;
  transition: 0.2s ease-in;
  width: min-content !important;
  margin-left: 15px;
  margin-right: 15px;
  padding: 10px 20px !important;
  cursor: pointer;
}

.reset-btn-div span:hover {
  background: #cc0d27 !important;
  color: #fff !important;
}

div.tm-has-options.product {
  width: 100% !important;
}

div.summary.entry-summary.tc-init {
  margin: 0 auto;
}

.tcwidth-21,
.tcwidth-20 {
  flex: 0 0 50% !important;
  max-width: 50% !important;
}

#app {
  width: 100vw;
  height: 35vh;
  z-index: 30;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  box-shadow: 0px 10px 10px 0px rgb(10 10 10 / 10%);
  background: #f8f8f8;
}

.configurator-container,
#scene-container {
  width: 100%;
  position: relative;
  height: 100%;
}

.tc-cell.cpf-type-radio ul li.tc-mode-images {
  flex: 0 0 50% !important;
  max-width: 50% !important;
}

@media only screen and (min-width: 420px) {
  .tc-cell.cpf-type-radio ul li.tc-mode-images {
    flex: 0 0 33% !important;
    max-width: 33% !important;
  }
}

@media only screen and (min-width: 768px) {
  .tm-extra-product-options ul.tmcp-elements li.tmcp-field-wrap.tc-mode-startimages .checkbox-image.checkbox-image,
  .tm-extra-product-options ul.tmcp-elements li.tmcp-field-wrap.tc-mode-startimages .radio-image {
    width: 100px !important;
  }

  .tc-cell.cpf-type-radio ul li.tc-mode-images,
  .tcwidth-21,
  .tcwidth-20 {
    flex: 0 0 25% !important;
    max-width: 25% !important;
  }

  #app {
    width: 100vw;
    height: 45vh;
    z-index: 30;
    padding: 0 20%;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    box-shadow: 0px 10px 10px 0px rgb(10 10 10 / 10%);
  }
}

@media only screen and (min-width: 1200px) {
  div.tm-has-options.product {
    width: 50% !important;
  }

  .tc-cell.cpf-type-radio ul li.tc-mode-images {
    flex: 0 0 20% !important;
    max-width: 20% !important;
  }

  #app {
    padding: 0;
    height: auto;
    width: 50%;
    z-index: 10;
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
