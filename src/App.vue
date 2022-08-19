<template>
  <Configurator />
</template>

<script setup lang="ts">
import Configurator from "./configurator/Configurator.vue";
</script>

<style scoped>
.single-product div.tm-has-options.product.type-product {
  width: 50%;
  z-index: 20;
}
.single-product div.product .summary.entry-summary.tc-init {
  width: 90%;
}
</style>
