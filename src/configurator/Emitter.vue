<!-- Component used for event testing purposes only -->
<template>
  <div class="test_container">
    <h3>Gate 1</h3>
    <form @submit.prevent="sendChange(0, 'gate', 'gate1', 2, 2, 0, 0)" @change="sendChange(0, 'gate', 'gate1', 2, 2, 0, 0)">
      <select name="wallId" id="wallId">
        <option value="0">Front</option>
        <option value="1">Back</option>
        <option value="2">Left</option>
        <option value="3">Right</option>
      </select>
      <select name="gateType" id="gateType">
        <option value="tilted">Tilted</option>
        <option value="double">Double</option>
        <option value="wide">Wide panel</option>
        <option value="empty">Empty</option>
      </select>
    </form>
    <button @click="sendRemove('gate1')">REMOVE GATE</button>
    <hr />
    <h3>window1</h3>
    <form @submit.prevent="sendChange(1, 'window', 'window1', 1, 1, 2, 1)" @change="sendChange(1, 'window', 'window1', 1, 1, 2, 1)">
      <select name="wallId" id="wallId">
        <option value="0">Front</option>
        <option value="1">Back</option>
        <option value="2">Left</option>
        <option value="3">Right</option>
      </select>
    </form>
    <button @click="sendRemove('window1')">REMOVE WINDOW</button>
    <hr />
    <h3>Roof type</h3>
    <form @submit.prevent="sendUpdate(2, 'roof', 'roof')" @change="sendUpdate(2, 'roof', 'roof')">
      <select name="roofType" id="roofType">
        <option value="gable">Gable</option>
        <option value="front">Front</option>
        <option value="back">Back</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "Emitter",
  methods: {
    sendChange(formNr, type, name, width, height, x, y) {
      var object = {
        type: type,
        name: name,
        width: width,
        height: height,
        material: "RAL9010",
        x: x,
        y: y,
      };
      const data = new FormData(document.forms[formNr]);
      data.forEach((value, key) => {
        object[key] = value;
      });
      this.$store.commit("update", { eventType: "add", ...object });
    },
    sendRemove(name) {
      this.$store.commit("update", { eventType: "remove", name: name });
    },
    sendUpdate(formNr, type, name) {
      var object = {
        type: type,
        name: name,
        material: "RAL9010",
      };
      const data = new FormData(document.forms[formNr]);
      data.forEach((value, key) => {
        object[key] = value;
      });
      this.$store.commit("update", { eventType: "add", ...object });
    },
  },
};
</script>

<style>
.test_container {
  max-height: 100vh;
  width: 300px;
  overflow-y: scroll;
}
</style>
