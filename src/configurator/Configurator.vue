<template>
  <div class="configurator-container">
    <Emitter />
    <div id="scene-container"></div>
    <div class="alert-container">
      <TransitionGroup name="list" tag="ul">
        <li v-for="item in alerts" :key="item.id" class="alert">
          <div class="alert-close-btn" @click="store.commit('clearAlert', item.id)"></div>
          <p>{{ item.text }}</p>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import Emitter from "./Emitter.vue";
import { onMounted, computed, watch } from "@vue/runtime-core";
import { generator } from "./Generator";
import { useStore } from "vuex";

import createRenderer from "./createRenderer";
import createCamera from "./createCamera";

import { MathUtils, Clock } from "three";

const store = useStore();
const alerts = computed(() => store.getters.getAlerts);
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

  const saveBtn = document.querySelector(".save-btn-div span");
  const textareaFormatted = document.querySelector('textarea[name="product-data"]');
  const textareaRaw = document.querySelector('input[name="raw-garage-config"]');

  if (saveBtn)
    saveBtn.addEventListener("click", () => {
      const actualGarage = store.getters.getGarage;

      const formData = new FormData(document.querySelector("form.cart"));
      const hiddenKeys = ["tcaddtocart", "tm-epo-counter", "quantity", "cpf_product_price", "tc_form_prefix"];
      let formDataText = "";

      for (const pair of formData.entries()) {
        if (!hiddenKeys.includes(pair[0])) {
          if (/^\d+$/.test(pair[1])) {
            pair[1] += " cm";
          }
          pair[1] = pair[1].split("_")[0].replaceAll("_", " ");

          let label = document.querySelector(`[name=${pair[0]}]`).closest("[data-uniqid]")?.querySelector(".tm-epo-element-label")?.innerText;
          let val = "";

          if (label && !label.includes("*")) {
            label = label.replaceAll(":", "") + ": ";
            val = pair[1];
          } else {
            label = pair[1];
          }
          formDataText += `${label}${val} \r\n`;
        }
      }
      if (textareaFormatted) {
        textareaFormatted.value = formDataText;
      }
      if (textareaRaw) {
        textareaRaw.value = JSON.stringify(actualGarage);
      }
    });

  const resetBtn = document.querySelector(".reset-btn-div span");
  if (resetBtn) resetBtn.addEventListener("click", () => location.reload());
});
</script>

<style>
.alert-container {
  position: absolute;
  top: 15px;
  right: 0;
}

.alert {
  display: flex;
  position: relative;
  background: rgba(255, 0, 0, 0.75);
  width: 200px;
  padding: 0px 15px;
  margin-top: 15px;
  border: 1px solid red;
  border-radius: 10px;
  transition: all 0.2s;
}

.alert-close-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
}

.alert-close-btn::after {
  color: white;
  font-size: 13px;
  content: "\2716";
  transition: all 0.2s ease-in-out;
}

.alert-close-btn:hover::after {
  opacity: 0.7;
}

.alert p {
  font-family: sans-serif;
  font-size: 16px;
  color: white;
  margin: 10px 0;
}

.tm-extra-product-options ul.tmcp-elements li.tmcp-field-wrap.tc-mode-startimages .checkbox-image.checkbox-image,
.tm-extra-product-options ul.tmcp-elements li.tmcp-field-wrap.tc-mode-startimages .radio-image {
  max-height: 80px !important;
  width: 80px !important;
  object-fit: contain;
  margin-left: 20px;
  padding: 0px;
}

.label-hidden-div .tm-epo-element-label {
  display: none;
}

.reset-btn-div span {
  border: 1px solid #cc0d27;
  color: #cc0d27 !important;
  transition: 0.2s ease-in;
  margin-top: 1.125rem !important;
  margin-left: 15px;
  margin-right: 15px;
  padding: 10px 20px !important;
  cursor: pointer;
}

.reset-btn-div span:hover {
  background: #cc0d27 !important;
  color: #fff !important;
}

.save-btn-div span {
  width: calc(100% - 30px) !important;
  max-width: 200px !important;
  text-align: center;
  background: #cc0d27;
  color: #fff;
  box-shadow: 0 0.25rem 1.25rem rgb(0 0 0 / 25%);
  margin-bottom: 1.5rem;
  transition: 0.2s ease-in;
  margin-top: 1.125rem !important;
  margin-left: 15px;
  margin-right: 15px;
  padding: 10px 20px !important;
  cursor: pointer;
}

.save-btn-div span:hover {
  background: #000;
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
  .alert-container {
    top: 80%;
  }

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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
