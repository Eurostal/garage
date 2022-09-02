<script>
export default {
  name: "Emitter",
  data() {
    return {
      roofNameTranslation: {
        "Spad w tył_1": "back",
        "Spad w przód_2": "front",
        "Spad w prawo_3": "right",
        "Spad w lewo_4": "left",
        Dwuspadowy_0: "gable",
      },
      gateNameTranslation: {
        Dwuskrzydłowa_0: "double",
        Uchylna_1: "tilted",
        "Uchylna - szeroki panel_2": "wide",
        "Bez bramy - otwarty przód_3": "empty",
        "Zamiast bramy ściana_4": "",
        "Zamiast bramy ściana": "",
      },
      gateStyleTranslation: {
        Pionowe_0: "",
        Poziome_1: "_H",
      },
    };
  },
  methods: {
    changeRoof: function (name = "Dwuspadowy_0") {
      let object = {
        type: "roof",
        roofType: this.roofNameTranslation[name],
      };
      this.$store.commit("update", { ...object });
    },
    changeRoofEvent: function (e) {
      this.changeRoof(e.target.value);
    },
    changeGarageSize: function ({ width = false, length = false }) {
      let object = {};
      if (width) {
        object.width = width;
      }

      if (length) {
        object.length = length;
      }

      if (width || length) {
        this.$store.commit("reInit", { ...object });
      }
    },
    changeGarageWidthEvent: function (e) {
      this.changeGarageSize({
        width: parseFloat(e.target.value.split(" ")[0].replace(",", ".")),
      });
      document.querySelector("form.cart").querySelector('div[data-uniqid="627a9ae125d4d6.54277708"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGarageLengthEvent: function (e) {
      this.changeGarageSize({
        length: parseFloat(e.target.value.split(" ")[0].replace(",", ".")),
      });
      document.querySelector("form.cart").querySelector('div[data-uniqid="627a9ad625d4b6.52719206"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate: function (name, { type = false, width = false, height = false, position = false, style = "", material = "" }) {
      let object = {};
      object.type = "gate";
      object.name = name;
      object.wallId = 0;

      if (type) {
        object.gateType = this.gateNameTranslation[type];
      }

      if (typeof width === "number") {
        object.width = width;
      }

      if (typeof height === "number") {
        object.height = height;
      }

      if (typeof position === "number") {
        object.x = position;
      }

      if (style) {
        object.style = this.gateStyleTranslation[style];
      }

      if (material) {
        object.material = material;

        if (style) {
          object.material = material + object.style;
        }
      }

      console.log(object);

      this.$store.commit("update", { ...object });

      if (object.gateType === "") {
        this.$store.commit("remove", { ...object });
      }
    },
    changeGate1Event: function (e) {
      this.changeGate("gate1", {
        type: e.target.value,
      });
    },
    changeGate2Event: function (e) {
      this.changeGate("gate2", {
        type: e.target.value,
      });
    },
    changeGate1PositionEvent: function (e) {
      this.changeGate("gate1", {
        position: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
      });
    },
    changeGate2PositionEvent: function (e) {
      this.changeGate("gate2", {
        position: e.target.value / 100,
      });
    },
    changeGate1SizeEvent: function (e) {
      this.changeGate("gate1", {
        position: e.target.value / 100,
      });
    },
    changeGate2SizeEvent: function (e) {
      this.changeGate("gate2", {
        position: e.target.value / 100,
      });
    },
    changeGate1WidthEvent: function (e) {
      this.changeGate("gate1", {
        width: parseFloat(e.target.value.split(" ")[0]) / 100,
      });
    },
    changeGate2WidthEvent: function (e) {
      this.changeGate("gate2", {
        width: parseFloat(e.target.value.split(" ")[0]) / 100,
      });
    },
    changeGate1HeightEvent: function (e) {
      this.changeGate("gate1", {
        height: parseFloat(e.target.value.split(" ")[0]) / 100,
      });
    },
    changeGate2HeightEvent: function (e) {
      this.changeGate("gate2", {
        height: parseFloat(e.target.value.split(" ")[0]) / 100,
      });
    },
    changeGate1StyleEvent: function (e) {
      let material = "RAL9010";

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="6267c6616c1022.10988552"] input')
        .forEach((input) => {
          if (input.checked) {
            material = input.value.split("_")[0];
          }
        });

      this.changeGate("gate1", {
        style: e.target.value,
        material: material,
      });
    },
    changeGate2StyleEvent: function (e) {
      let material = "RAL9010";

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="6267c6616c1022.10988552"] input')
        .forEach((input) => {
          if (input.checked) {
            material = input.value.split("_")[0];
          }
        });

      this.changeGate("gate2", {
        style: e.target.value,
        material: material,
      });
    },

    changeWindow: function ({ name, action = true }) {
      let object = {
        type: "window",
        name: name,
        wallId: this.selectWall(name),
      };
      this.$store.commit(action ? "update" : "remove", { ...object });
    },
    changeWindowFirstEvent: function (e) {
      this.changeWindow({
        name: "window1",
        action: e.target.checked,
      });
    },
    changeWindowSecondEvent: function (e) {
      this.changeWindow({
        name: "window2",
        action: e.target.checked,
      });
    },
    changeWindowThirdEvent: function (e) {
      this.changeWindow({
        name: "window3",
        action: e.target.checked,
      });
    },
    changeWindowFourthEvent: function (e) {
      this.changeWindow({
        name: "window4",
        action: e.target.checked,
      });
    },
    changeWindowFifthEvent: function (e) {
      this.changeWindow({
        name: "window5",
        action: e.target.checked,
      });
    },
    selectWall(input) {
      let wallId = 0;
      switch (input) {
        case "Przednia ściana_3":
          wallId = 0;
          break;
        case "Tylna ściana_2":
          wallId = 1;
          break;
        case "Lewa ściana_1":
          wallId = 2;
          break;
        case "Prawa ściana_0":
          wallId = 3;
          break;
        default:
          wallId = 3;
      }
      return wallId;
    },
  },

  mounted: function () {
    var form = document.querySelector("form.cart");
    if (document.querySelector("form.cart")) {
      // form.addEventListener("change", this.changeEventForm, { passive: true });

      form.querySelectorAll('div[data-uniqid="62581d466f2312.18396791"] input').forEach((input) =>
        input.addEventListener("change", this.changeRoofEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6259298d5b5755.33518299"] select').forEach((input) =>
        input.addEventListener("change", this.changeGarageWidthEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626932f0482669.99437527"] select').forEach((input) =>
        input.addEventListener("change", this.changeGarageLengthEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="625928cfacd5e1.56204472"] input').forEach((input) =>
        input.addEventListener("change", this.changeGate1Event, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="627b7715c54f09.72204841"] input').forEach((input) =>
        input.addEventListener("change", this.changeGate2Event, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="625928cfacd5f2.48728982"] select').forEach((input) =>
        input.addEventListener("change", this.changeGate1WidthEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="627b7720c54f10.62015977"] select').forEach((input) =>
        input.addEventListener("change", this.changeGate2WidthEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="625928cfacd608.04744343"] select').forEach((input) =>
        input.addEventListener("change", this.changeGate1HeightEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="627b772ac54f28.86727207"] select').forEach((input) =>
        input.addEventListener("change", this.changeGate2HeightEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="625929fa7219b1.06715193"] select').forEach((input) =>
        input.addEventListener("change", this.changeGate1StyleEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="627b7732c54f35.77583366"] select').forEach((input) =>
        input.addEventListener("change", this.changeGate2StyleEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="62ffad9da82021.94156944"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeGate1PositionEvent(t);
            input.setAttribute("value", t);
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      form.querySelectorAll('div[data-uniqid="62ffaf77735284.94935292"] input').forEach((input) =>
        input.addEventListener("change", this.changeGate2PositionEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607df3.98247608"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindowFirstEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607e49.00803437"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindowSecondEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607e94.51163204"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindowThirdEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607ee3.26554221"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindowFourthEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607f38.30729408"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindowFifthEvent, {
          passive: true,
        })
      );
    }
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
