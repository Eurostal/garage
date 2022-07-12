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
      <select name="material" id="material">
        <option value="RAL9010">RAL9010</option>
        <option value="RAL9010_H">RAL9010 horizontal</option>
        <option value="WOOD_DARK_SHINE">WOOD_DARK_SHINE</option>
        <option value="WOOD_LIGHT">WOOD_LIGHT</option>
        <option value="BTX6020">BTX6020</option>
      </select>
    </form>
    <button @click="sendRemove('gate1', 0)">REMOVE GATE</button>
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
    <button @click="sendRemove('window1', 1)">REMOVE WINDOW</button>
    <hr />
    <h3>Roof type</h3>
    <form @submit.prevent="sendRoofAdd(2, 'roof', 'roof')" @change="sendRoofAdd(2, 'roof', 'roof')">
      <select name="roofType" id="roofType">
        <option value="gable">Gable</option>
        <option value="front">Front</option>
        <option value="back">Back</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
    </form>
    <h4>Roof color</h4>
    <form @change="sendUpdate(3, 'roof', 'roof')">
      <select name="material" id="material">
        <option value="RAL9010">RAL9010</option>
        <option value="RAL9010_H">RAL9010 horizontal</option>
        <option value="WOOD_DARK_SHINE">WOOD_DARK_SHINE</option>
        <option value="WOOD_LIGHT">WOOD_LIGHT</option>
        <option value="BTX6020">BTX6020</option>
      </select>
    </form>
    <hr />
    <h3>Garage sizes</h3>
    <form @change="sendReinit(4)">
      Width:
      <input type="range" name="width" id="width" min="1" max="7" value="6" />
      <br />
      Length: <input type="range" name="length" id="length" min="1" max="7" value="5" />
      <br />
      Height:
      <input type="range" name="height" id="height" min="1" max="7" value="2" />
    </form>
    <hr />
    <h3>Walls color</h3>
    <form @change="sendUpdate(5, 'walls', '')">
      <select name="material" id="material">
        <option value="RAL9010">RAL9010</option>
        <option value="RAL9010_H">RAL9010 horizontal</option>
        <option value="WOOD_DARK_SHINE">WOOD_DARK_SHINE</option>
        <option value="WOOD_LIGHT">WOOD_LIGHT</option>
        <option value="BTX6020">BTX6020</option>
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
        x: x,
        y: y,
      };
      const data = new FormData(document.forms[formNr]);
      data.forEach((value, key) => {
        object[key] = value;
      });
      this.$store.commit("update", { eventType: "add", ...object });
    },

    sendRemove(name, formNr) {
      var object = {
        eventType: "remove",
        name: name,
      };
      const data = new FormData(document.forms[formNr]);
      data.forEach((value, key) => {
        object[key] = value;
      });
      console.log(object.wallId);
      this.$store.commit("update", object);
    },

    sendRoofAdd(formNr, type, name) {
      var object = {
        type: type,
        name: name,
      };
      const data = new FormData(document.forms[formNr]);
      data.forEach((value, key) => {
        object[key] = value;
      });
      this.$store.commit("update", { eventType: "add", ...object });
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
      console.log(object);
      this.$store.commit("update", { eventType: "update", ...object });
    },

    sendReinit(formNr) {
      var object = {
        width: 5,
        length: 5,
        height: 2,
        material: "RAL9010",
      };
      const data = new FormData(document.forms[formNr]);
      data.forEach((value, key) => {
        object[key] = parseInt(value);
      });

      this.$store.commit("reInit", object);
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
