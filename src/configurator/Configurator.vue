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
    <div v-if="snapsLoading" class="snaps-loader">
        <span> Saving... </span>
    </div>
  </div>
</template>

<script setup>
import Emitter from "./Emitter.vue";
import { onMounted, computed, watch, ref } from "@vue/runtime-core";
import { generator } from "./Generator";
import { useStore } from "vuex";

import createRenderer from "./createRenderer";
import createCamera from "./createCamera";

import { MathUtils, Clock } from "three";

const store = useStore();
const alerts = computed(() => store.getters.getAlerts);
const clock = new Clock();
const snapsLoading = computed(() => store.getters.getSnapsLoading);

onMounted(() => {
  const container = document.getElementById("scene-container");
  const scene = generator.getScene();
  const renderer = createRenderer(container);
  const {camera,controls} = createCamera(container, renderer);

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
});
</script>

<style>

#temp-renderer-container {
  visibility: hidden;
}

ul.sides {
  display: flex;
  list-style: none;
}
.sides canvas {
  margin-right: 10px;
}

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

.snaps-loader {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snaps-loader span {
  padding: 20px 60px;
  background: white;
  color: black;
  font-size: 18px;
  font-family: sans-serif;
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
  z-index: 0;
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

/* FORM AND PRODUCT PAGE STYLES */

body.postid-6213.woocommerce #primary {
  width: 100%;
}

/* Red underline in titles */
h3.tc-cell.tc-epo-label.tm-epo-element-label.tcwidth-100::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 18px;
  width: 1.25rem;
  height: 2px;
  background-image: linear-gradient(to right, #cc0d27 0, #cc0d27 3px, transparent 4px, transparent 6px, #cc0d27 7px);
}

/* bg-gray */
.postid-6213 div#content,
.postid-6213 .block-content {
  background: #f8f8f8;
}

/* Bar category links */
@media (min-width: 768px) {
  .postid-6213 .storefront-breadcrumb {
    padding: 10px 20px;
    margin: 0 0 10px;
  }
}

/* Configurator positioning */
@media (min-width: 768px) {
  .postid-6213 .single-product div.product .summary {
    width: 55%;
    margin-left: 25px;
    float: none;
  }
}

/* Configurator container width */
@media (min-width: 1280px) {
  .postid-6213 .col-full {
    max-width: 1280px;
  }
}

/* Hidden main img */
.postid-6213 .woocommerce-product-gallery__image--placeholder {
  display: none;
}

/* almost 3D visualition */
/* Dwuspadowy */
/*
#tab-description > p > img.alignnone.size-medium.wp-image-17 {
    position: fixed;
    right: 100px;
    bottom: 30px;
    width: 32%;
    background: #FFF;
    box-shadow: 0 0 2px #000;
}
*/
/* Hidden img preview */
.postid-6213 #tab-description > p > img.alignnone.size-medium.wp-image-18,
.postid-6213 #tab-description > p > img.alignnone.size-medium.wp-image-21,
.postid-6213 #tab-description > p > img.alignnone.size-medium.wp-image-20,
.postid-6213 #tab-description > p > img.alignnone.size-medium.wp-image-19 {
  display: none;
  position: fixed;
  right: 100px;
  bottom: 30px;
  width: 32%;
  background: #fff;
  box-shadow: 0 0 2px #aeaeae;
}

@media (max-width: 1100px) {
  .postid-6213 #tab-description > p > img {
    right: 50px !important;
    bottom: 80px !important;
  }
}

/* preview show */
.postid-6213 .show {
  display: inline !important;
}

/* Star "*" before title of roof type */
span.tm-epo-required {
  display: none;
}

/* Star "*" before Rodzaj konstrukcji */
h3.tc-cell.tc-epo-label.tm-epo-element-label.tm-has-required.tcwidth-100 {
  display: none;
}

/* Roof type img */
.postid-6213 img.square.radio-image {
  padding: 15px;
}

/* Roof type img bg */
.postid-6213 ul > li > label > span > img.square {
  background: #f8f8f8;
  transition: 0.2s ease-in;
}

/* Roof type img border on active*/
.tm-extra-product-options .tmcp-field-wrap.tc-active .tc-label-wrap img.radio-image.square {
  border: 3px solid #cc0d27;
  border-width: 3px;
  background: #fff;
  transition: 0.2s ease-in;
}

/* Roof type img signature color */
li.tmcp-field-wrap.tmhexcolorimage-li-nowh.tm-per-row.tc-mode-images span.tc-label.radio-image-label {
  font-size: 1rem;
  color: #b1b1b1;
}

/* Roof type img:hover signature color */
li.tmcp-field-wrap.tmhexcolorimage-li-nowh.tm-per-row.tc-mode-images:hover span.tc-label.radio-image-label {
  color: #cc0d27;
  transition: 0.2s ease-in;
}

/* Roof, window, gate img signature red when active */
.tm-extra-product-options .highlight-div * {
  color: #cc0d27;
}

/* Garage dynamic dimensions value red */
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > .tc-row {
  padding: 0 15px;
}

#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div:nth-child(8) > div > div > h5,
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div:nth-child(10) > div > div > h5,
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div:nth-child(12) > div > div > h5,
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div:nth-child(14) > div > div > h5,
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div:nth-child(16) > div > div > h5 {
  color: #cc0d27;
}

/* Horizontal separator */
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-divider {
  margin-bottom: 0;
  margin-top: 15px;
}

/* Button popup color-choice-section */
.button.alt.tm-section-link,
.postid-6213 input.wpcf7-form-control.wpcf7-submit {
  background: #cc0d27;
  color: #fff;
  box-shadow: 0 0.25rem 1.25rem rgb(0 0 0 / 25%);
  margin-bottom: 1.5rem;
  transition: 0.2s ease-in;
  border: 0;
  padding: 0.6180469716em 1.41575em;
  border-radius: 5px;
}

.save-btn-div span,
.reset-btn-div span {
  border-radius: 5px;
}

/* Button popup color-chooice-section */
.button.alt.tm-section-link:hover,
.postid-6213 input.wpcf7-form-control.wpcf7-submit:hover {
  background: #000;
  color: #fff;
}

/* Width for btn in buider is 33%  - > popup needs 100% */
.cpf-section.tc-cell.tcwidth-33.btn-roof-color.section_popup,
.cpf-section.tc-cell.tcwidth-33.btn-acord-color.section_popup,
.cpf-section.tc-cell.tcwidth-33.btn-garage-color.section_popup,
.cpf-section.tc-cell.tcwidth-33.btn-walls-color.section_popup,
.cpf-section.tc-cell.tcwidth-33.btn-gate-color.section_popup {
  max-width: 100%;
}

/* Select box font */
.postid-6213 select {
  color: #cc0d27;
  font-size: 1.25rem;
  font-weight: bold;
  border: none;
  appearance: none;
}

/* SelectBox titles H4 16px */
h4.tc-cell.tc-epo-label.tm-epo-element-label.tm-has-required.tcwidth-100 {
  font-size: 1rem;
}

/* checkbox titles */
.tm-extra-product-options ul.tmcp-ul-wrap.tm-extra-product-options-checkbox li.tmcp-field-wrap label,
.tm-extra-product-options ul.tmcp-ul-wrap.tm-extra-product-options-radio li.tmcp-field-wrap label {
  font-weight: 700;
  font-size: 14px;
  color: #cc0d27;
}

/* checkbox selected box */
.tc-active span.tc-epo-style-wrapper.square2 {
  color: #fff;
  background: #cc0d27;
  border: none;
  font-size: 15px;
  width: 20px;
  height: 20px;
}

/* checkbox unselected box */
span.tc-epo-style-wrapper.square2 {
  color: #fff;
  background: #fff;
  width: 20px;
  height: 20px;
  border: 2px solid #f1f1f1;
}

/* "+" sign in Dodaj okno & Dodaj drzwi, removing standard styling */
#tc-epo-form-6213-0
  > div:nth-child(18)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2,
#tc-epo-form-6213-0
  > div:nth-child(20)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.iscpfdependson.is-epo-depend.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2,
#tc-epo-form-6213-0
  > div:nth-child(22)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.iscpfdependson.is-epo-depend.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2 {
  color: #fff;
  background: #fff;
  border: none;
}
/* "+" sign (|) in Dodaj okno & Dodaj drzwi checkbox */
#tc-epo-form-6213-0
  > div:nth-child(18)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2:before,
#tc-epo-form-6213-0
  > div:nth-child(20)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.iscpfdependson.is-epo-depend.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2:before,
#tc-epo-form-6213-0
  > div:nth-child(22)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.iscpfdependson.is-epo-depend.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2:before {
  content: "";
  position: absolute;
  background: #cc0d27;
  left: 8px;
  top: 1px;
  height: 17px;
  width: 3px;
  z-index: 1;
}
/* "+" sign (-) in Dodaj okno & Dodaj drzwi checkbox */
#tc-epo-form-6213-0
  > div:nth-child(18)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2:after,
#tc-epo-form-6213-0
  > div:nth-child(20)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.iscpfdependson.is-epo-depend.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2:after,
#tc-epo-form-6213-0
  > div:nth-child(22)
  > div
  > div
  > div
  > div
  > div.tc-container.cpf-element.tc-cell.tcwidth-100.cpf-type-checkbox.iscpfdependson.is-epo-depend.tc-container-enabled
  > div
  > div
  > div
  > ul
  > li
  > label
  > span.tc-epo-style-wrapper.square2:after {
  content: "";
  position: absolute;
  background: #cc0d27;
  left: 1px;
  top: 8px;
  width: 17px;
  height: 3px;
}
span.tc-label.tm-label {
  cursor: pointer;
}
/*	span.tc-label.tm-epo-style.square2 {
    z-index: 1;
    background: #fff;
}*/

/* Section dodatki padding */
h3.tc-cell.tc-epo-label.tm-epo-element-label.tcwidth-100 {
  padding-top: 1rem;
}

/* Grey vertical separator */
#tc-epo-form-6213-0 > div:nth-child(18) > div > div > div > div > div:nth-child(3):before {
  content: "";
  position: absolute;
  left: 1px;
  width: 2px;
  height: 53px;
  background: #e0e0e0;
  z-index: 1;
}

/* Range picker handle in Dodatki */
.postid-6213 .noui-handle.noui-handle-lower {
  border: 2px solid #cc0d27;
  border-radius: 5px;
  background: #fff;
  width: 16px;
  height: 16px;
}

/* Range picker handle circle hover */
.postid-6213 .noui-handle::before {
  background-color: #cc0d2733;
}

/* Range picker grey line after before */
.postid-6213 .noui-connect {
  background: #e0e0e0;
}

/* Range picker grey line after handle */
.postid-6213 .noui-connects {
  background: #e0e0e0;
}

/* Range picker value */
label.tm-epo-field-label.tm-show-picker-value {
  font-size: 1rem !important;
  color: #181828;
  padding: 6px 20px;
  border: 1px solid #e0e0e0;
}

/* Range picker value 'cm' */
label.tm-epo-field-label.tm-show-picker-value:after {
  content: " cm";
}

/* Horizontal separator */
hr.hr_divider.tc-cell.tc-width100 {
  background: #f1f1f1;
  height: 2px;
}

/* Grey vertical separators */
/* Separator of okno dodaki as before */
#tc-epo-form-6213-0 > div:nth-child(18) > div > div > div > div > div:nth-child(3):before {
  content: "";
  position: absolute;
  left: 1px;
  width: 2px;
  height: 53px;
  background: #e0e0e0;
  z-index: 1;
}

/* Arrow in selectBox */
label.tm-epo-field-label.fullwidth:after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #181828;
  border-right: 2px solid #181828;
  transform: rotate(135deg);
  top: 8px;
  right: 42px;
  pointer-events: none;
}

/* Borders around each section */
/* Dach */
#tc-epo-form-6213-0 > div:nth-child(1) > div > div > div > div {
  background: #fff;
  padding: 15px;
}

/* Wymiary dach */
#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div {
  background: #fff;
  padding: 15px;
}

/* Rodzaj konstrukcji */
#tc-epo-form-6213-0 > div:nth-child(4) > div > div,
/* Typ bramy */
#tc-epo-form-6213-0 > div:nth-child(6) > div > div {
  background: #fff;

  padding: 15px;
}

/* Meksyk */
/* Poszycie top */
#tc-epo-form-6213-0 > div:nth-child(9) > div > div {
  padding: 15px;
}
/* Poszycie left&right */
#tc-epo-form-6213-0 > div:nth-child(9) > div > div,
#tc-epo-form-6213-0 > div:nth-child(10) > div > div,
#tc-epo-form-6213-0 > div:nth-child(12) > div > div {
  background: #fff;
}
#tc-epo-form-6213-0 > div:nth-child(11) > div > div {
  background: #fff;
}
#tc-epo-form-6213-0 > div:nth-child(13) > div > div {
}
#tc-epo-form-6213-0 > div:nth-child(15) > div > div {
}
/* Poszycie buttons 'dostosuj kolor' bottom */
#tc-epo-form-6213-0 > div:nth-child(13) > div > div,
#tc-epo-form-6213-0 > div:nth-child(14) > div > div,
#tc-epo-form-6213-0 > div:nth-child(15) > div > div {
  background: #fff;
}

/* Dodatki */
/* border left & right */
#tc-epo-form-6213-0 > div:nth-child(19) > div > div,
#tc-epo-form-6213-0 > div:nth-child(20) > div > div,
#tc-epo-form-6213-0 > div:nth-child(21) > div > div,
#tc-epo-form-6213-0 > div:nth-child(22) > div > div,
#tc-epo-form-6213-0 > div:nth-child(23) > div > div,
#tc-epo-form-6213-0 > div:nth-child(24) > div > div,
#tc-epo-form-6213-0 > div:nth-child(25) > div > div,
#tc-epo-form-6213-0 > div:nth-child(26) > div > div,
#tc-epo-form-6213-0 > div:nth-child(27) > div > div,
#tc-epo-form-6213-0 > div:nth-child(28) > div > div,
#tc-epo-form-6213-0 > div:nth-child(29) > div > div {
  padding: 0 30px;
  background: #fff;
}

/* UPDATE */
#tc-epo-form-6213-0 > div:nth-child(1),
#tc-epo-form-6213-0 > div:nth-child(2),
#tc-epo-form-6213-0 > div:nth-child(3),
#tc-epo-form-6213-0 > div:nth-child(4),
#tc-epo-form-6213-0 > div:nth-child(5),
#tc-epo-form-6213-0 > div:nth-child(6),
#tc-epo-form-6213-0 > div:nth-child(7),
#tc-epo-form-6213-0 > div:nth-child(8),
#tc-epo-form-6213-0 > div:nth-child(9),
#tc-epo-form-6213-0 > div:nth-child(10),
#tc-epo-form-6213-0 > div:nth-child(11) {
  order: -1;
}

#tc-epo-form-6213-0 > div:nth-child(12) {
  order: 0;
}
#tc-epo-form-6213-0 > div:nth-child(13) {
  order: 2;
}
#tc-epo-form-6213-0 > div:nth-child(14) {
  order: 4;
}
#tc-epo-form-6213-0 > div:nth-child(15) {
  order: 1;
}
#tc-epo-form-6213-0 > div:nth-child(16) {
  order: 3;
}
#tc-epo-form-6213-0 > div:nth-child(17) {
  order: 5;
}

#tc-epo-form-6213-0 > div:nth-child(18),
#tc-epo-form-6213-0 > div:nth-child(19),
#tc-epo-form-6213-0 > div:nth-child(20),
#tc-epo-form-6213-0 > div:nth-child(21),
#tc-epo-form-6213-0 > div:nth-child(22),
#tc-epo-form-6213-0 > div:nth-child(23),
#tc-epo-form-6213-0 > div:nth-child(24),
#tc-epo-form-6213-0 > div:nth-child(25),
#tc-epo-form-6213-0 > div:nth-child(26),
#tc-epo-form-6213-0 > div:nth-child(27),
#tc-epo-form-6213-0 > div:nth-child(28),
#tc-epo-form-6213-0 > div:nth-child(29) {
  order: 10;
}

#tc-epo-form-6213-0 > div:nth-child(12) > div > div,
#tc-epo-form-6213-0 > div:nth-child(13) > div > div,
#tc-epo-form-6213-0 > div:nth-child(14) > div > div,
#tc-epo-form-6213-0 > div:nth-child(15) > div > div,
#tc-epo-form-6213-0 > div:nth-child(16) > div > div,
#tc-epo-form-6213-0 > div:nth-child(17) > div > div {
  border-bottom: 0;
  background: #fff;
}

@media (min-width: 768px) {
  #tc-epo-form-6213-0 > div:nth-child(12) > div > div {
    border-right: 0;
  }
  #tc-epo-form-6213-0 > div:nth-child(13) > div > div {
    border-right: 0;
    border-left: 0;
  }
  #tc-epo-form-6213-0 > div:nth-child(14) > div > div {
    border-left: 0;
  }
  #tc-epo-form-6213-0 > div:nth-child(15) > div > div {
    border-right: 0;
  }
  #tc-epo-form-6213-0 > div:nth-child(16) > div > div {
    border-right: 0;
    border-left: 0;
  }
  #tc-epo-form-6213-0 > div:nth-child(17) > div > div {
    border-left: 0;
  }

  #tc-epo-form-6213-0 > div:nth-child(12) {
    order: 0;
  }
  #tc-epo-form-6213-0 > div:nth-child(13) {
    order: 1;
  }
  #tc-epo-form-6213-0 > div:nth-child(14) {
    order: 2;
  }
  #tc-epo-form-6213-0 > div:nth-child(15) {
    order: 3;
  }
  #tc-epo-form-6213-0 > div:nth-child(16) {
    order: 4;
  }
  #tc-epo-form-6213-0 > div:nth-child(17) {
    order: 5;
  }

  /* Separator of others as borders */
  #tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div:nth-child(3),
  #tc-epo-form-6213-0 > div:nth-child(6) > div > div > div > div > div:nth-child(4) {
    border-left: 2px solid #e0e0e0;
    border-right: 2px solid #e0e0e0;
  }
  #tc-epo-form-6213-0 > div:nth-child(9) > div > div > div > div > div:nth-child(3),
  #tc-epo-form-6213-0 > div:nth-child(18) > div > div > div > div > div:nth-child(9),
  #tc-epo-form-6213-0 > div:nth-child(18) > div > div > div > div > div:nth-child(15),
  #tc-epo-form-6213-0 > div:nth-child(18) > div > div > div > div > div:nth-child(21),
  #tc-epo-form-6213-0 > div:nth-child(18) > div > div > div > div > div:nth-child(27) {
    border-left: 2px solid #e0e0e0;
  }
}

body.single-product.postid-6213 #tc-epo-form-6213-0 > [data-uniqid="634e811af6be40.72579754"],
body.single-product.postid-6213 #tc-epo-form-6213-0 > [data-uniqid="634e811df6be83.27166318"],
body.single-product.postid-6213 #tc-epo-form-6213-0 > [data-uniqid="6277c583bc6e91.89041822"],
body.single-product.postid-6213 #tc-epo-form-6213-0 > [data-uniqid="6268597436a4e8.74048409"],
body.single-product.postid-6213 #tc-epo-form-6213-0 > [data-uniqid="6267c6836c1098.51557180"],
body.single-product.postid-6213 #tc-epo-form-6213-0 > [data-uniqid="6267c6936c1105.52576630"] {
  background: #fff;
}

.postid-6213 .single-product-content.single-product-content__back {
  width: 90%;
  margin: 0 auto;
}

.postid-6213 .single-product-content-right.tc-init {
  padding: 0;
}

.postid-6213 h5 {
  font-size: 13px;
  text-transform: none;
  line-height: 2rem;
}

.postid-6213 h4.tc-cell.tc-epo-label.tm-epo-element-label.tm-has-required.tcwidth-100 {
  font-size: 16px;
  line-height: 2.25rem;
}

.postid-6213 select {
  font-size: 16px;
}

.postid-6213 h3 {
  font-size: 25px;
  line-height: 3.5rem;
}

.postid-6213 li.tmcp-field-wrap.tmhexcolorimage-li-nowh.tm-per-row.tc-mode-images span.tc-label.radio-image-label {
  font-size: 16px;
}

.postid-6213 .top-area-items {
  max-width: 100%;
}

.postid-6213 #app {
  margin: 0 -21px;
}

.postid-6213 .tm-extra-product-options-fields.tc-container {
  margin-bottom: 60px;
}

@media (min-width: 1200px) {
  .postid-6213 #app {
    margin: 0;
  }

  .postid-6213 .tm-extra-product-options-fields.tc-container {
    margin-bottom: 80px;
  }
}

.postid-6213 input[type="checkbox"],
.postid-6213 input[type="radio"] {
  appearance: none;
  width: 20px !important;
  height: 20px;
  border: 2px solid #f1f1f1;
  cursor: pointer;
  position: relative;
}

.postid-6213 input[type="checkbox"]:checked,
.postid-6213 input[type="radio"]:checked {
  background: #cc0d27;
  border: 2px solid #fff;
}

.postid-6213 input[type="checkbox"]::after {
  content: "";
  display: block;
  height: 6px;
  width: 10px;
  border-bottom: 3px solid white;
  border-left: 3px solid white;
  position: absolute;
  left: 3px;
  top: 3.5px;
  transform: rotate(-45deg);
}

.postid-6213 input[type="radio"]::after {
  content: "";
  display: block;
  height: 10px;
  width: 10px;
  background: #fff;
  position: absolute;
  left: 3px;
  top: 3px;
  border-radius: 9999px;
}

.postid-6213 input.tmcp-checkbox.tmcp-checkbox,
.postid-6213 [data-uniqid="6269489cbc6a47.11299589"] input.tmcp-radio {
  display: inline-block !important;
}

.postid-6213 .label.tm-epo-field-label.tm-show-picker-value {
  font-size: 14px !important;
}

#tc-epo-form-6213-0 > div:nth-child(2) > div > div > div > div > div.tc-container:nth-child(n + 4):nth-child(-n + 23) {
  display: none;
}

.tm-epo-field.tmcp-select {
  text-align: left;
}

.postid-15 .wpcf7-file{
  display: none;
}
</style>
