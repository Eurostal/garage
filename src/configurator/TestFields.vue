<template>
    <div class="inputs-gui">
        <div>
            <input type="range" min="0" max="10" step="0.01" v-model="doorX">
            {{ doorX }}
        </div>

        <div>
            <input v-model="roofType" type="radio" name="roof" value="gable">
            <input v-model="roofType" type="radio" name="roof" value="back">
            <input v-model="roofType" type="radio" name="roof" value="front">
            <input v-model="roofType" type="radio" name="roof" value="left">
            <input v-model="roofType" type="radio" name="roof" value="right">
            {{ roofType }}
        </div>

        <div>
            <input type="range" min="0" max="5" step="0.01" v-model="windowX">
            {{ windowX }}
            <input type="range" min="0" max="2" step="0.01" v-model="windowY">
            {{ windowY }}
        </div>
    </div>
</template>
<script setup>
import { watch, ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";


const store = useStore();
const doorX = ref(0)
const roofType = ref('gable')
const windowX = ref(0)
const windowY = ref(0)

watch(doorX, (newVal) => {
    let object = {
        type: "door",
        name: "doorTest",
        defaultInside: true,
    };
    object.wallId = 2;
    object.x = newVal;
    store.commit("update", { ...object });
})

watch(roofType, (newVal) => {
    let object = {
        type: "roof",
        roofType: newVal,
    };
    store.commit("update", { ...object });

})

watchEffect(() => {
    let object = {
        type: "window",
        name: "windowTest",
        defaultInside: true,
    };
    object.wallId = 2;
    object.x = windowX.value;
    object.y = windowY.value
    store.commit("update", { ...object });
})
</script>
<style>
.inputs-gui{
    position: fixed;
    bottom:0;
    left:0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.4)
}
</style>