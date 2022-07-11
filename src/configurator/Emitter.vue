<!-- Component used for event testing purposes only -->
<template>
  <div>
    <form @submit.prevent="sendChange($event)" @change="sendChange($event)">
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
    <button @click="sendRemove()">REMOVE GATE</button>
  </div>
</template>

<script>
export default {
  name: "Emitter",
  methods: {
    sendChange(event) {
      var object = {
        type: "gate",
        name: "gate1",
        width: 2,
        height: 2,
        material: "RAL9010",
        x: 0,
      };
      const data = new FormData(document.forms[0]);
      data.forEach((value, key) => {
        object[key] = value;
      });
      this.$store.commit("update", { eventType: "add", ...object });
    },
    sendRemove() {
      this.$store.commit("update", { eventType: "remove", name: "gate1" });
    },
  },
};
</script>

<style></style>
