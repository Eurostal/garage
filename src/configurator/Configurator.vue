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
import Emitter from './Emitter.vue'
import { onMounted, computed } from '@vue/runtime-core'
import { generator } from './Generator'
import { useStore } from 'vuex'

import createRenderer from './createRenderer'
import createCamera from './createCamera'

import { MathUtils } from 'three'

const store = useStore()
const message = computed(() => store.getters.getMessage)

onMounted(() => {
  const container = document.getElementById('scene-container')
  const scene = generator.getScene()
  const renderer = createRenderer(container)
  const { camera, controls } = createCamera(container, renderer)

  scene.add(camera)

  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.fov = MathUtils.radToDeg(
      2 * Math.atan(Math.tan(MathUtils.degToRad(75) * 0.5) / camera.aspect),
    )
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  })

  renderer.setAnimationLoop(function () {
    renderer.render(scene, camera)
    controls.update()
  })
})
</script>

<style>
#scene-container {
  max-height: 600px;
  width: 100%;
  aspect-ratio: 1/1;
}

.configurator-container {
  display: flex;
  position: relative;
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
