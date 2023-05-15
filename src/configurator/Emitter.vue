<script>
import { Materials } from "./materials";
import snapSides from "./snapSides";
import { generator } from "./Generator";

export default {
  name: "Emitter",
  data() {
    return {
      roofNameTranslation: {
        "1": "back",
        "2": "front",
        "3": "right",
        "4": "left",
        "0": "gable",
      },
      gateNameTranslation: {
        "0": "double",
        "1": "tilted",
        "2": "wide",
        "3": "empty",
        "4": "",
        "": "",
      },
      gateStyleTranslation: {
        "0": "",
        "1": "_H",
      },
      handleNameTranslations: {
        "0": "left",
        "1": "right",
      },
    };
  },
  watch: {
    "$store.state.msg": function (newMsg, oldMsg) {
      if (newMsg.eventName) {
        switch (newMsg.eventName) {
          case "xOffsetChange":
            switch (newMsg.item) {
              case "gate1":
                if (
                  !document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="625928cfacd5e1.56204472"]').querySelector('.tmcp-field-wrap:last-child input').checked
                ) {
                  var sliderGate1 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="62ffad9da82021.94156944"] .noui-target').noUiSlider;
                  if (typeof sliderGate1 === "object") {
                    sliderGate1.set(Math.round(newMsg.value.after * 100));
                    // console.log(newMsg.value.after * 100)
                  }
                }
                break;
              case "gate2":
                if (
                  !document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="627b7715c54f09.72204841"]').querySelector('.tmcp-field-wrap:last-child input').checked
                ) {
                  var sliderGate2 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="62ffaf77735284.94935292"] .noui-target').noUiSlider;
                  if (typeof sliderGate2 === "object") {
                    sliderGate2.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window1":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="6266674e607f87.48123623"] input').checked) {
                  var window1 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607e27.12468774"] .noui-target').noUiSlider;
                  if (typeof window1 === "object") {
                    window1.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window2":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607e49.00803437"] input').checked) {
                  var window2 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607e72.58094923"] .noui-target').noUiSlider;
                  if (typeof window2 === "object") {
                    window2.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window3":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607e94.51163204"] input').checked) {
                  var window3 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607ec0.38279999"] .noui-target').noUiSlider;
                  if (typeof window3 === "object") {
                    window3.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window4":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607ee3.26554221"] input').checked) {
                  var window4 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607f13.98580250"] .noui-target').noUiSlider;
                  if (typeof window4 === "object") {
                    window4.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window5":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607f38.30729408"] input').checked) {
                  var window5 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607f67.37945639"] .noui-target').noUiSlider;
                  if (typeof window5 === "object") {
                    window5.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "door1":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="62666bae882dc3.07513822"] input').checked) {
                  var door1 = document.querySelector("form.cart").querySelector('div[data-uniqid="62666bae882df0.44298974"] .noui-target').noUiSlider;
                  if (typeof door1 === "object") {
                    door1.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "door2":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="6267a72c905212.61206813"] input').checked) {
                  var door2 = document.querySelector("form.cart").querySelector('div[data-uniqid="6267a72c905252.02727997"] .noui-target').noUiSlider;
                  if (typeof door2 === "object") {
                    door2.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              default:
                console.log(newMsg.item);
            }
            break;
          case "yOffsetChange":
            switch (newMsg.item) {
              case "window1":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="6266674e607f87.48123623"] input').checked) {
                  var window1 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607e37.33496203"] .noui-target').noUiSlider;
                  if (typeof window1 === "object") {
                    window1.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window2":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607e49.00803437"] input').checked) {
                  var window2 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607e84.50408653"] .noui-target').noUiSlider;
                  if (typeof window2 === "object") {
                    window2.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window3":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607e94.51163204"] input').checked) {
                  var window3 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607ed0.11804888"] .noui-target').noUiSlider;
                  if (typeof window3 === "object") {
                    window3.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window4":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607ee3.26554221"] input').checked) {
                  var window4 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607f29.14038358"] .noui-target').noUiSlider;
                  if (typeof window4 === "object") {
                    window4.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
              case "window5":
                if (document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607f38.30729408"] input').checked) {
                  var window5 = document
                    .querySelector("form.cart")
                    .querySelector('div[data-uniqid="626666fc607f79.78538581"] .noui-target').noUiSlider;
                  if (typeof window5 === "object") {
                    window5.set(Math.round(newMsg.value.after * 100));
                  }
                }
                break;
            }
          default:
            console.log(JSON.stringify(newMsg));
        }

        setTimeout(() => {
          this.$store.commit("clearMsg");
        }, 3000);
      }
    },
  },
  methods: {
    closeMaterialPopup: function () {
      let closeBtn = document.querySelector(".button.floatbox-cancel");
      if (closeBtn) closeBtn.click();
    },
    changeRoof: function (name = "Dwuspadowy_0") {
      let object = {
        type: "roof",
        roofType: this.roofNameTranslation[name.split('_').reverse()[0]],
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

      if (width) {
        if (!document.querySelector('div[data-uniqid="625928cfacd5e1.56204472"]').querySelector('.tmcp-field-wrap:last-child input').checked) {
          var sliderGate1 = document.querySelector("form.cart").querySelector('div[data-uniqid="62ffad9da82021.94156944"] .noui-target').noUiSlider;
          if (typeof sliderGate1 === "object") {
            sliderGate1.updateOptions({ range: { min: 0, max: width * 100 } });
          }
        }

        if (!document.querySelector('div[data-uniqid="627b7715c54f09.72204841"]').querySelector('.tmcp-field-wrap:last-child input').checked) {
          var sliderGate2 = document.querySelector("form.cart").querySelector('div[data-uniqid="62ffaf77735284.94935292"] .noui-target').noUiSlider;
          if (typeof sliderGate2 === "object") {
            sliderGate2.updateOptions({ range: { min: 0, max: width * 100 } });
          }
        }
      }
    },
    changeGarageWidthEvent: function (e) {
      let garageWidth = parseFloat(e.target.value.split(" ")[0].replace(",", "."));
      this.changeGarageSize({
        width: garageWidth,
      });

      //Label update
      document.querySelector("form.cart").querySelector('div[data-uniqid="627a9ae125d4d6.54277708"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGarageLengthEvent: function (e) {
      let garareLength = parseFloat(e.target.value.split(" ")[0].replace(",", "."));
      this.changeGarageSize({
        length: garareLength,
      });

      //Label update
      document.querySelector("form.cart").querySelector('div[data-uniqid="627a9ad625d4b6.52719206"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate: function (name, { type = false, width = false, height = false, position = false, style = "", material = "", handle ,frameReflective}) {
      let object = {};
      object.type = "gate";
      object.name = name;
      object.wallId = 0;

      if (type) {
        object.gateType = this.gateNameTranslation[type.split('_').reverse()[0]];
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

      if (material) {
        object.material = material;

        if (style) {
          object.material = material + this.gateStyleTranslation[style.split('_').reverse()[0]];
        }
      }

      if (typeof handle === "boolean") {
        object.handle = handle;
      }

      if (typeof frameReflective === "boolean") {
        object.frameReflective = frameReflective;
      }

      if (object.gateType === "") {
        this.$store.commit("remove", { ...object });
      } else {
        this.$store.commit("update", { ...object });
      }

      object
    },
    changeGate1Event: function (e) {
      let object = {};
      object.type = e.target.value;
      if (this.gateNameTranslation[e.target.value.split('_').reverse()[0]] != "") {
        let position = document.querySelector('div[data-uniqid="62ffad9da82021.94156944"] .tmcp-range').value;
        object.position = parseFloat(position) < 1 ? 0 : parseFloat(position) / 100;
      }

      //Update gate by other properties in form after enabling it
      document.querySelector('div[data-uniqid="625928cfacd5f2.48728982"] select').dispatchEvent(new Event("change"));
      document.querySelector('div[data-uniqid="625928cfacd608.04744343"] select').dispatchEvent(new Event("change"));
      document.querySelector('div[data-uniqid="625929fa7219b1.06715193"] select').dispatchEvent(new Event("change"));

      if (this.gateNameTranslation[e.target.value.split('_').reverse()[0]] === "double") {
        let handleState = document.querySelector('div[data-uniqid="633bd32afb6935.83995440"] input').checked;
        object.handle = handleState;
      }

      document.querySelectorAll('div[data-uniqid="6269489cbc6a47.11299589"] input').forEach((input) => {
          if(input.checked && input.value.split('_').reverse()[0] == "2"){
            object.frameReflective = true;
          }
        }
      );

      //Disable gate2 if gate1 is
      if (!this.gateNameTranslation[e.target.value.split('_').reverse()[0]] != "") {
        document.querySelector('div[data-uniqid="627b7715c54f09.72204841"]').querySelector('.tmcp-field-wrap:last-child input').click();
        document.querySelector('div[data-uniqid="627b7715c54f09.72204841"]').querySelector('.tmcp-field-wrap:last-child input').dispatchEvent(new Event("change"));
        this.changeGate("gate2", object);
      }

      this.changeGate("gate1", object);

      //Label update
      document.querySelector("form.cart").querySelector('div[data-uniqid="627ae6909e8ac6.12947879"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate2Event: function (e) {
      let object = {};
      object.type = e.target.value;

      let inputId = "";

      if (document.querySelector('div[data-uniqid="6268636725a2c5.41006929"] select').value == "Jednolity kolor_0") {
        inputId = "6267c6616c1022.10988552";
      } else {
        inputId = "6267c6936c1105.52576630";
      }

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="' + inputId + '"] input')
        .forEach((input) => {
          if (input.checked) {
            object.material = this.materialNameTranslation(input);
          }
        });

      object.material = Materials[object.material] != undefined ? object.material : "RAL9010";

      if (this.gateNameTranslation[e.target.value] != "") {
        let position = document.querySelector('div[data-uniqid="62ffaf77735284.94935292"] .tmcp-range').value;
        object.position = parseFloat(position) < 1 ? 0 : parseFloat(position) / 100;
      }

      //Update gate by other properties in form after enabling it
      document.querySelector('div[data-uniqid="627b7720c54f10.62015977"] select').dispatchEvent(new Event("change"));
      document.querySelector('div[data-uniqid="627b772ac54f28.86727207"] select').dispatchEvent(new Event("change"));
      document.querySelector('div[data-uniqid="627b7732c54f35.77583366"] select').dispatchEvent(new Event("change"));


      if (this.gateNameTranslation[e.target.value.split('_').reverse()[0]] === "double") {
        let handleState = document.querySelector('div[data-uniqid="633bee3ec19b25.96850533"] input').checked;
        object.handle = handleState;
      }

      document.querySelectorAll('div[data-uniqid="6269489cbc6a47.11299589"] input').forEach((input) => {
          if(input.checked && input.value.split('_').reverse()[0] == "2"){
            object.frameReflective = true;
          }
        }
      );


      this.changeGate("gate2", object);

      //Label update
      document.querySelector("form.cart").querySelector('div[data-uniqid="631872d1491992.81432171"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate1PositionEvent: function (e) {
      this.changeGate("gate1", {
        position: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
      });
    },
    changeGate2PositionEvent: function (e) {
      this.changeGate("gate2", {
        position: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
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

      document.querySelector("form.cart").querySelector('div[data-uniqid="627ae6819e8a97.45224982"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate2WidthEvent: function (e) {
      this.changeGate("gate2", {
        width: parseFloat(e.target.value.split(" ")[0]) / 100,
      });

      document.querySelector("form.cart").querySelector('div[data-uniqid="631872d1491992.81432171"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate1HeightEvent: function (e) {
      this.changeGate("gate1", {
        height: parseFloat(e.target.value.split(" ")[0]) / 100,
      });

      document.querySelector("form.cart").querySelector('div[data-uniqid="627ae6a39e8af4.67785060"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate2HeightEvent: function (e) {
      this.changeGate("gate2", {
        height: parseFloat(e.target.value.split(" ")[0]) / 100,
      });

      document.querySelector("form.cart").querySelector('div[data-uniqid="631872d84919a3.06627727"] .tc-epo-label').textContent =
        e.target.value.split("_")[0];
    },
    changeGate1StyleEvent: function (e) {
      let material = "RAL9010";
      let inputId = null;

      if (document.querySelector('div[data-uniqid="6268636725a2c5.41006929"] select').value == "Jednolity kolor_0") {
        inputId = "6267c6616c1022.10988552";
      } else {
        inputId = "6267c6936c1105.52576630";
      }

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="' + inputId + '"] input')
        .forEach((input) => {
          if (input.checked) {
            material = this.materialNameTranslation(input);
          }
        });

      this.changeGate("gate1", {
        style: e.target.value,
        material: material,
      });
    },
    changeGate1HandleEvent: function (e) {
      this.changeGate("gate1", { handle: e.target.checked });
    },
    changeGate2StyleEvent: function (e) {
      let material = "RAL9010";
      let inputId = null;

      if (document.querySelector('div[data-uniqid="6268636725a2c5.41006929"] select').value == "Jednolity kolor_0") {
        inputId = "6267c6616c1022.10988552";
      } else {
        inputId = "6267c6936c1105.52576630";
      }

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="' + inputId + '"] input')
        .forEach((input) => {
          if (input.checked) {
            material = this.materialNameTranslation(input);
          }
        });

      this.changeGate("gate2", {
        style: e.target.value,
        material: material,
      });
    },
    changeGate2HandleEvent: function (e) {
      this.changeGate("gate2", { handle: e.target.checked });
    },

    //WINDOWS

    changeWindow: function (name, { wallId = undefined, width = false, height = false, x = false, y = false, material = "", action = true }) {
      let object = {
        type: "window",
        name: name,
      };

      if (typeof wallId === "number") {
        object.wallId = wallId;
      } else {
        object.wallId = this.selectWall(document.querySelector('div[data-uniqid="62666dcf882f62.16373762"] select').value);
      }

      if (typeof width === "number") {
        object.width = width;
      }

      if (typeof height === "number") {
        object.height = height;
      }

      if (typeof x === "number") {
        object.x = x;
      }

      if (typeof y === "number") {
        object.y = y;
      }

      if (material) {
        object.material = material;
      }

      this.$store.commit(action ? "update" : "remove", { ...object });
    },

    changeWindowsEvent: function (e) {
      var window1el = document.querySelector("form.cart").querySelector('div[data-uniqid="62666bae882db9.11397527"] input:checked');
      if (window1el) {
        window1el.removeAttribute("checked");
        window1el.checked = false;
        window1el.dispatchEvent(new Event("change"));
      }

      var window2el = document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607e49.00803437"] input:checked');
      if (window2el) {
        window2el.removeAttribute("checked");
        window2el.checked = false;
        window2el.dispatchEvent(new Event("change"));
      }

      var window3el = document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607e94.51163204"] input:checked');
      if (window3el) {
        window3el.removeAttribute("checked");
        window3el.checked = false;
        window3el.dispatchEvent(new Event("change"));
      }

      var window4el = document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607ee3.26554221"] input:checked');
      if (window4el) {
        window4el.removeAttribute("checked");
        window4el.checked = false;
        window4el.dispatchEvent(new Event("change"));
      }

      var window5el = document.querySelector("form.cart").querySelector('div[data-uniqid="626666fc607f38.30729408"] input:checked');
      if (window5el) {
        window5el.removeAttribute("checked");
        window5el.checked = false;
        window5el.dispatchEvent(new Event("change"));
      }
    },
    //window1
    changeWindow1Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="62666dcf882f62.16373762"] select').value);
      this.changeWindow("window1", {
        wallId: wallId,
        action: e.target.checked,
      });
    },

    changeWindow1SizeEvent: function (e) {
      let sizeData = e.target.value.split("x");
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="62666dcf882f62.16373762"] select').value);
      this.changeWindow("window1", {
        wallId: wallId,
        width: sizeData[0] / 100,
        height: sizeData[1].split("cm")[0] / 100,
      });
    },

    changeWindow1WallEvent: function (e) {
      this.changeWindow("window1", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e09.04638628"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e10.77344128"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));
      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e37.33496203"] .tmcp-range')
        .forEach((input) => (input.value = input.value));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e27.12468774"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeWindow1MaterialEvent: function (e) {
      this.changeWindow("window1", {
        material: this.materialNameTranslation(e.target),
      });
    },

    changeWindow1PositionXEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="6266674e607f87.48123623"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="62666dcf882f62.16373762"] select').value);
        this.changeWindow("window1", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeWindow1PositionYEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="6266674e607f87.48123623"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="62666dcf882f62.16373762"] select').value);
        this.changeWindow("window1", {
          wallId: wallId,
          y: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    //window2
    changeWindow2Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b819218ab2.27821592"] select').value);
      this.changeWindow("window2", {
        wallId: wallId,
        action: e.target.checked,
      });
    },

    changeWindow2SizeEvent: function (e) {
      let sizeData = e.target.value.split("x");
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b819218ab2.27821592"] select').value);
      this.changeWindow("window2", {
        wallId: wallId,
        width: sizeData[0] / 100,
        height: sizeData[1].split("cm")[0] / 100,
      });
    },

    changeWindow2WallEvent: function (e) {
      this.changeWindow("window2", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e59.49199639"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e65.66848936"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e72.58094923"] .tmcp-range')
        .forEach((input) => (input.value = input.value));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607e84.50408653"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeWindow2MaterialEvent: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b819218ab2.27821592"] select').value);
      this.changeWindow("window2", {
        wallId: wallId,
        material: this.materialNameTranslation(e.target),
      });
    },

    changeWindow2PositionXEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607e49.00803437"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b819218ab2.27821592"] select').value);
        this.changeWindow("window2", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeWindow2PositionYEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607e49.00803437"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b819218ab2.27821592"] select').value);
        this.changeWindow("window2", {
          wallId: wallId,
          y: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    //window3
    changeWindow3Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b829218ac5.43623952"] select').value);
      this.changeWindow("window3", {
        wallId: wallId,
        action: e.target.checked,
      });
    },

    changeWindow3SizeEvent: function (e) {
      let sizeData = e.target.value.split("x");
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b829218ac5.43623952"] select').value);
      this.changeWindow("window3", {
        wallId: wallId,
        width: sizeData[0] / 100,
        height: sizeData[1].split("cm")[0] / 100,
      });
    },

    changeWindow3WallEvent: function (e) {
      this.changeWindow("window3", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ea4.67519101"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="62f22c432e8664.47573288"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ec0.38279999"] .tmcp-range')
        .forEach((input) => (input.value = input.value));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ed0.11804888"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeWindow3MaterialEvent: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b829218ac5.43623952"] select').value);
      this.changeWindow("window3", {
        wallId: wallId,
        material: this.materialNameTranslation(e.target),
      });
    },

    changeWindow3PositionXEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607e94.51163204"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b829218ac5.43623952"] select').value);
        this.changeWindow("window3", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeWindow3PositionYEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607e94.51163204"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b829218ac5.43623952"] select').value);
        this.changeWindow("window3", {
          wallId: wallId,
          y: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    //window4
    changeWindow4Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b836218ad3.26225604"] select').value);
      this.changeWindow("window4", {
        wallId: wallId,
        action: e.target.checked,
      });
    },

    changeWindow4SizeEvent: function (e) {
      let sizeData = e.target.value.split("x");
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b836218ad3.26225604"] select').value);
      this.changeWindow("window4", {
        wallId: wallId,
        width: sizeData[0] / 100,
        height: sizeData[1].split("cm")[0] / 100,
      });
    },

    changeWindow4WallEvent: function (e) {
      this.changeWindow("window4", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ef9.15943710"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="62f22c812e8675.77136207"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607f13.98580250"] .tmcp-range')
        .forEach((input) => (input.value = input.value));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607f29.14038358"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeWindow4MaterialEvent: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b836218ad3.26225604"] select').value);
      this.changeWindow("window4", {
        wallId: wallId,
        material: this.materialNameTranslation(e.target),
      });
    },

    changeWindow4PositionXEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607ee3.26554221"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b836218ad3.26225604"] select').value);
        this.changeWindow("window4", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeWindow4PositionYEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607ee3.26554221"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b836218ad3.26225604"] select').value);
        this.changeWindow("window4", {
          wallId: wallId,
          y: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    //window5
    changeWindow5Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b85e218ae1.80232513"] select').value);
      this.changeWindow("window5", {
        wallId: wallId,
        action: e.target.checked,
      });
    },

    changeWindow5SizeEvent: function (e) {
      let sizeData = e.target.value.split("x");
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="626666fc607f79.78538581"] select').value);
      this.changeWindow("window5", {
        wallId: wallId,
        width: sizeData[0] / 100,
        height: sizeData[1].split("cm")[0] / 100,
      });
    },

    changeWindow5WallEvent: function (e) {
      this.changeWindow("window5", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ea4.67519101"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="62f22c432e8664.47573288"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ec0.38279999"] .tmcp-range')
        .forEach((input) => (input.value = input.value));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="626666fc607ed0.11804888"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeWindow5MaterialEvent: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b85e218ae1.80232513"] select').value);
      this.changeWindow("window5", {
        wallId: wallId,
        material: this.materialNameTranslation(e.target),
      });
    },

    changeWindow5PositionXEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607f38.30729408"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b85e218ae1.80232513"] select').value);
        this.changeWindow("window5", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeWindow5PositionYEvent: function (e) {
      let windowActive = document.querySelector('form.cart div[data-uniqid="626666fc607f38.30729408"] input').checked;
      if (windowActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b85e218ae1.80232513"] select').value);
        this.changeWindow("window5", {
          wallId: wallId,
          y: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    //DOORS
    changeDoor: function (
      name,
      { wallId = undefined, width = false, height = false, x = false, y = false, material = "", handle = false, action = true }
    ) {
      let object = {
        type: "door",
        name: name,
        defaultInside: true,
      };

      if (typeof wallId === "number") {
        object.wallId = wallId;
      } else {
        object.wallId = 0;
      }

      if (typeof x === "number") {
        object.x = x;
      }

      if (material) {
        object.material = material;
      }

      if (handle) {
        object.handleSide = this.handleNameTranslations[handle.split('_').reverse()[0]];
      }

      this.$store.commit(action ? "update" : "remove", { ...object });
    },

    changeDoorsEvent: function (e) {
      var door1el = document.querySelector("form.cart").querySelector('div[data-uniqid="62666bae882dc3.07513822"] input:checked');
      if (door1el) {
        door1el.removeAttribute("checked");
        door1el.checked = false;
        door1el.dispatchEvent(new Event("change"));
      }

      var door2el = document.querySelector("form.cart").querySelector('div[data-uniqid="6267a72c905212.61206813"] input:checked');
      if (door2el) {
        door2el.removeAttribute("checked");
        door2el.checked = false;
        door2el.dispatchEvent(new Event("change"));
      }
    },

    //door1
    changeDoor1Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b940ff8d56.42586482"] select').value);
      this.changeDoor("door1", {
        wallId: wallId,
        action: e.target.checked,
      });

      if (e.target.checked) {
        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="62666bae882dd8.31559354"] select')
          .forEach((input) => input.dispatchEvent(new Event("change")));

        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="6267b940ff8d56.42586482"] select')
          .forEach((input) => input.dispatchEvent(new Event("change")));
      }
    },

    changeDoor1WallEvent: function (e) {
      this.changeDoor("door1", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="62666ca2882f55.58904320"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="6267a7849054a6.96450831"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="62666bae882df0.44298974"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeDoor1MaterialEvent: function (e) {
      var value = "RAL9010";
      var wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b940ff8d56.42586482"] select').value);
      if (e.target.checked) {
        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="6267a7849054a6.96450831"] input:checked:not(#' + e.target.id + ")")
          .forEach((input) => {
            input.checked = false;
            input.dispatchEvent(new Event("change"));
          });

        value = this.materialNameTranslation(e.target);
        value = Materials[value] != undefined ? value : "RAL9010";
      }

      if (document.querySelector('div[data-uniqid="62666ca2882f55.58904320"] select').value.split('_').reverse()[0] == '1') {
        value = value + "_H";
      }

      this.changeDoor("door1", {
        wallId: wallId,
        material: value,
      });

      this.closeMaterialPopup();
    },

    changeDoor1SheetOrientation: function (e) {
      if (document.querySelector('div[data-uniqid="6267a7849054a6.96450831"] input:checked') != undefined) {
        document.querySelector('div[data-uniqid="6267a7849054a6.96450831"] input:checked').dispatchEvent(new Event("change"));
      } else {
        document.querySelector('div[data-uniqid="6267a7849054a6.96450831"] input').dispatchEvent(new Event("change"));
      }
    },

    changeDoor1PositionXEvent: function (e) {
      let doorActive = document.querySelector('form.cart div[data-uniqid="62666bae882dc3.07513822"] input').checked;
      if (doorActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b940ff8d56.42586482"] select').value);
        this.changeDoor("door1", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeDoor1HandleEvent: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b940ff8d56.42586482"] select').value);
      this.changeDoor("door1", {
        wallId: wallId,
        handle: e.target.value,
      });
    },

    //door2
    changeDoor2Event: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b951ff8d63.21986646"] select').value);
      this.changeDoor("door2", {
        wallId: wallId,
        action: e.target.checked,
      });

      if (e.target.checked) {
        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="6267a72c905227.37498764"] select')
          .forEach((input) => input.dispatchEvent(new Event("change")));

        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="6267a72c905239.21013961"] select')
          .forEach((input) => input.dispatchEvent(new Event("change")));
      }
    },

    changeDoor2WallEvent: function (e) {
      this.changeDoor("door2", { wallId: this.selectWall(e.target.value) });

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="6267a72c905239.21013961"] select')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="6267aabb3ebb46.11907871"] input:checked')
        .forEach((input) => input.dispatchEvent(new Event("change")));

      document
        .querySelector("form.cart")
        .querySelectorAll('div[data-uniqid="6267a72c905252.02727997"] .tmcp-range')
        .forEach((input) => (input.value = input.value));
    },

    changeDoor2MaterialEvent: function (e) {
      var value = "RAL9010";
      var wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b951ff8d63.21986646"] select').value);
      if (e.target.checked) {
        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="6267aabb3ebb46.11907871"] input:checked:not(#' + e.target.id + ")")
          .forEach((input) => {
            input.checked = false;
            input.dispatchEvent(new Event("change"));
          });

        value = this.materialNameTranslation(e.target);
        value = Materials[value] != undefined ? value : "RAL9010";
      }

      if (document.querySelector('div[data-uniqid="6267a72c905239.21013961"] select').value.split('_').reverse()[0] == '1') {
        value = value + "_H";
      }

      this.changeDoor("door2", {
        wallId: wallId,
        material: value,
      });

      this.closeMaterialPopup();
    },

    changeDoor2SheetOrientation: function (e) {
      if (document.querySelector('div[data-uniqid="6267aabb3ebb46.11907871"] input:checked') != undefined) {
        document.querySelector('div[data-uniqid="6267aabb3ebb46.11907871"] input:checked').dispatchEvent(new Event("change"));
      } else {
        document.querySelector('div[data-uniqid="6267aabb3ebb46.11907871"] input').dispatchEvent(new Event("change"));
      }
    },

    changeDoor2PositionXEvent: function (e) {
      let doorActive = document.querySelector('form.cart div[data-uniqid="6267a72c905212.61206813"] input').checked;
      if (doorActive) {
        let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b951ff8d63.21986646"] select').value);
        this.changeDoor("door2", {
          wallId: wallId,
          x: parseFloat(e) < 1 ? 0 : parseFloat(e) / 100,
        });
      }
    },

    changeDoor2HandleEvent: function (e) {
      let wallId = this.selectWall(document.querySelector('div[data-uniqid="6267b951ff8d63.21986646"] select').value);
      this.changeDoor("door2", {
        wallId: wallId,
        handle: e.target.value,
      });
    },

    selectWall(input) {
      let wallId = 0;
      let inputId = input.split('_').reverse()[0]
      
      switch (inputId) {
        case "3":
          wallId = 0;
          break;
        case "2":
          wallId = 1;
          break;
        case "0":
          wallId = 2;
          break;
        case "1":
          wallId = 3;
          break;
        default:
          wallId = 3;
      }
      return wallId;
    },

    materialNameTranslation(input) {
      let material = input.value.split("_")[0].replace(" ", "");
      if(!input.value.includes("BTX") && !input.value.includes("RAL")){
        let input_format = input.value.split("_").reverse()[0].replace(" ", "");
      
      switch (input_format) {
        case "0":
          material = "BROWN";
          break;
        case "1":
          material = "GRAY";
          break;
        case "2":
          material = "WHITE";
          break;
        case "3":
          material = "DARK_WALNUT";
          break;
        case "4":
          material = "GOLD_OAK";
          break;
       }
      }

      if(input.closest('[data-uniqid="6261760bba5f22.33686069"]') ||
        input.closest('[data-uniqid="6267c6936c1164.00546693"]') ||
        input.closest('[data-uniqid="6267c6616c1085.91375841"]') ||
        input.closest('[data-uniqid="6267c6836c10f8.36577405"]') ||
        input.closest('[data-uniqid="6267a577abc065.93824612"]') ||
        input.closest('[data-uniqid="6267a784905502.42408900"]')){
        switch (input.value.split("_").reverse()[0].replace(" ", "")){
          case "0":
            material = "WOOD_LIGHT";
            break;
          case "1":
            material = "WOOD_LIGHT_SHINE";
            break;
          case "2":
            material = "WOOD_DARK";
            break;
          case "3":
            material = "WOOD_DARK_SHINE";
            break;
        }
      }
console.log('----' + material + '-------');
      return material;
    },
    changeFittings: function ({ material = false, action = true }) {
      var object = {};
      object.type = "fittings";

      if (action) {
        if (material) {
          object.material = material;
          this.$store.commit("updateMaterial", { ...object });
        } else {
          object.visible = true;
          this.$store.commit("update", { ...object });
        }
      } else {
        object.visible = false;
        this.$store.commit("remove", { ...object });
      }
    },
    changeFittingsEvent: function (e) {
      this.changeFittings({
        action: e.target.checked,
      });
    },
    changeFittingsMaterialEvent: function (e) {
      if (e.target.checked) {
        document
          .querySelector("form.cart")
          .querySelectorAll('div[data-uniqid="6267a577abc002.73453783"] input:checked:not(#' + e.target.id + ")")
          .forEach((input) => {
            input.checked = false;
            input.dispatchEvent(new Event("change"));
          });

        var value = this.materialNameTranslation(e.target);
        value = Materials[value] != undefined ? value : "RAL9010";

        this.changeFittings({
          material: value,
        });
      }

      this.closeMaterialPopup();
    },

    // Materials
    dispatchMaterialsEvents: function (e) {
      if (document.querySelector('div[data-uniqid="6268636725a2c5.41006929"] select').value == "Jednolity kolor_0") {
        if (document.querySelector('div[data-uniqid="6267c6616c1022.10988552"] input:checked') != undefined) {
          document.querySelector('div[data-uniqid="6267c6616c1022.10988552"] input:checked')?.dispatchEvent(new Event("change"));
        } else {
          document.querySelector('div[data-uniqid="6267c6616c1022.10988552"] input')?.dispatchEvent(new Event("change"));
        }
      } else {
        if (document.querySelector('div[data-uniqid="6267c6836c1098.51557180"] input:checked') != undefined) {
          document.querySelector('div[data-uniqid="6267c6836c1098.51557180"] input:checked')?.dispatchEvent(new Event("change"));
        } else {
          document.querySelector('div[data-uniqid="6267c6836c1098.51557180"] input')?.dispatchEvent(new Event("change"));
        }
        if (document.querySelector('div[data-uniqid="6268597436a4e8.74048409"] input:checked') != undefined) {
          document.querySelector('div[data-uniqid="6268597436a4e8.74048409"] input:checked')?.dispatchEvent(new Event("change"));
        } else {
          document.querySelector('div[data-uniqid="6268597436a4e8.74048409"] input')?.dispatchEvent(new Event("change"));
        }
      }
    },

    changeMaterialArrangementEvent: function (e) {
      if (e.target.value == "Jednolity kolor_0") {
        document.querySelector('div[data-uniqid="6267c6616c1022.10988552"] input:checked')?.dispatchEvent(new Event("change"));
      }
    },

    changeAllMaterialEvent: function (e) {
      if (e.target.checked) {
        document.querySelectorAll('div[data-uniqid="6267c6616c1022.10988552"] input:checked:not(#' + e.target.id + ")").forEach((input) => {
          input.checked = false;
          input.dispatchEvent(new Event("change"));
        });
      }
      this.changeWallMaterial(e);
      this.changeRoofMaterial(e);
      this.changeGatesMaterial(e);

      this.closeMaterialPopup();
    },

    changeWallMaterial: function (e) {
      let object = {};
      object.material = "RAL9010";
      object.type = "walls";
      object.defaultInside = true;

      if (e.target.checked) {
        document.querySelectorAll('div[data-uniqid="6267c6836c1098.51557180"] input:checked:not(#' + e.target.id + ")").forEach((input) => {
          input.checked = false;
          input.dispatchEvent(new Event("change"));
        });

        object.material = this.materialNameTranslation(e.target);
        object.material = Materials[object.material] != undefined ? object.material : "RAL9010";
      }

      if (document.querySelector('div[data-uniqid="6268636725a2b2.40930404"] select').value.split('_').reverse()[0] == '1') {
        object.material = object.material + "_H";
      }
      this.$store.commit("updateMaterial", { ...object });

      this.closeMaterialPopup();
    },

    changeGatesFrame: function (e) {
      let isReflective = false
      if (e.target.value.split('_').reverse()[0] == "2") {
        isReflective = true;
      }
      this.changeGate("gate1", { frameReflective: isReflective });
      this.changeGate("gate2", { frameReflective: isReflective });

    },

    changeRoofMaterial: function (e) {
      if (e.target.checked) {
        document.querySelectorAll('div[data-uniqid="6268597436a4e8.74048409"] input:checked:not(#' + e.target.id + ")").forEach((input) => {
          input.checked = false;
          input.dispatchEvent(new Event("change"));
        });

        let object = {};
        object.type = "roof";
        object.material = this.materialNameTranslation(e.target);
        object.material = Materials[object.material] != undefined ? object.material : "RAL9010";
        object.defaultInside = true;

        this.$store.commit("updateMaterial", { ...object });
      }

      this.closeMaterialPopup();
    },

    changeGatesMaterial: function (e) {
      if (e.target.checked) {
        document.querySelectorAll('div[data-uniqid="6267c6936c1105.52576630"] input:checked:not(#' + e.target.id + ")").forEach((input) => {
          input.checked = false;
          input.dispatchEvent(new Event("change"));
        });

        let object = {};
        let horizontal = document.querySelector('div[data-uniqid="625929fa7219b1.06715193"] select').value == "Poziome_1";

        object.material = this.materialNameTranslation(e.target);
        if (this.gateNameTranslation[document.querySelector('div[data-uniqid="625928cfacd5e1.56204472"] input:checked').value] != "") {
          this.changeGate("gate1", {
            material: object.material + (horizontal ? "_H" : ""),
          });
        }

        horizontal = document.querySelector('div[data-uniqid="627b7732c54f35.77583366"] select').value == "Poziome_1";
        if (this.gateNameTranslation[document.querySelector('div[data-uniqid="627b7715c54f09.72204841"] input:checked').value] != "") {
          this.changeGate("gate2", {
            material: object.material + (horizontal ? "_H" : ""),
          });
        }
      }

      this.closeMaterialPopup();
    },

    rawConfigSave: function(){
      const textareaFormatted = document.querySelector('textarea[name="product-data"]');
      const textareaRaw = document.querySelector('input[name="raw-garage-config"]');
      const actualGarage = this.$store.getters.getGarage;
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

          if (label) {
            label = label.replaceAll(":", "").replaceAll("*", "");
            val = ": " + pair[1];
          } else {
            val = ": ÁNO";
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

      form.querySelector('div[data-uniqid="633bd32afb6935.83995440"] input').addEventListener("change", this.changeGate1HandleEvent, {
        passive: true,
      });

      form.querySelector('div[data-uniqid="633bee3ec19b25.96850533"] input').addEventListener("change", this.changeGate2HandleEvent, {
        passive: true,
      });

      form.querySelectorAll('div[data-uniqid="62ffad9da82021.94156944"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeGate1PositionEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      form.querySelectorAll('div[data-uniqid="62ffaf77735284.94935292"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeGate2PositionEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      form.querySelectorAll('div[data-uniqid="626666fc607df3.98247608"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindowsEvent, {
          passive: true,
        })
      );

      //window1
      form.querySelectorAll('div[data-uniqid="6266674e607f87.48123623"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow1Event, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607e09.04638628"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow1SizeEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="62666dcf882f62.16373762"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow1WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="626666fc607e10.77344128"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow1MaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607e27.12468774"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow1PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });
      form.querySelectorAll('div[data-uniqid="626666fc607e37.33496203"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow1PositionYEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      //window2

      form.querySelectorAll('div[data-uniqid="626666fc607e49.00803437"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow2Event, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="626666fc607e59.49199639"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow2SizeEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267b819218ab2.27821592"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow2WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="626666fc607e65.66848936"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow2MaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607e72.58094923"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow2PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });
      form.querySelectorAll('div[data-uniqid="626666fc607e84.50408653"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow2PositionYEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      //window3
      form.querySelectorAll('div[data-uniqid="626666fc607e94.51163204"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow3Event, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="626666fc607ea4.67519101"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow3SizeEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267b829218ac5.43623952"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow3WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="62f22c432e8664.47573288"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow3MaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607ec0.38279999"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow3PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });
      form.querySelectorAll('div[data-uniqid="626666fc607ed0.11804888"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow3PositionYEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      //window4
      form.querySelectorAll('div[data-uniqid="626666fc607ee3.26554221"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow4Event, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="626666fc607ef9.15943710"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow4SizeEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267b836218ad3.26225604"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow4WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="62f22c812e8675.77136207"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow4MaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607f13.98580250"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow4PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });
      form.querySelectorAll('div[data-uniqid="626666fc607f29.14038358"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow4PositionYEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      //window5
      form.querySelectorAll('div[data-uniqid="626666fc607f38.30729408"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow5Event, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="626666fc607f40.14629036"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow5SizeEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267b85e218ae1.80232513"] select').forEach((input) =>
        input.addEventListener("change", this.changeWindow5WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="62f22c982e8686.31004466"] input').forEach((input) =>
        input.addEventListener("change", this.changeWindow5MaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="626666fc607f67.37945639"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow5PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });
      form.querySelectorAll('div[data-uniqid="626666fc607f79.78538581"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeWindow5PositionYEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      form.querySelectorAll('div[data-uniqid="62666b39a2cd72.64951747"] input').forEach((input) =>
        input.addEventListener("change", this.changeDoorsEvent, {
          passive: true,
        })
      );

      //door1
      form.querySelectorAll('div[data-uniqid="62666bae882dc3.07513822"] input').forEach((input) =>
        input.addEventListener("change", this.changeDoor1Event, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="62666bae882dd8.31559354"] select').forEach((input) =>
        input.addEventListener("change", this.changeDoor1HandleEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267b940ff8d56.42586482"] select').forEach((input) =>
        input.addEventListener("change", this.changeDoor1WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267a7849054a6.96450831"] input').forEach((input) =>
        input.addEventListener("change", this.changeDoor1MaterialEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="62666ca2882f55.58904320"] select').forEach((input) =>
        input.addEventListener("change", this.changeDoor1SheetOrientation, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="62666bae882df0.44298974"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeDoor1PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      //door2
      form.querySelectorAll('div[data-uniqid="6267a72c905212.61206813"] input').forEach((input) =>
        input.addEventListener("change", this.changeDoor2Event, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267a72c905227.37498764"] select').forEach((input) =>
        input.addEventListener("change", this.changeDoor2HandleEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267b951ff8d63.21986646"] select').forEach((input) =>
        input.addEventListener("change", this.changeDoor2WallEvent, {
          passive: true,
        })
      );
      form.querySelectorAll('div[data-uniqid="6267aabb3ebb46.11907871"] input').forEach((input) =>
        input.addEventListener("change", this.changeDoor2MaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6267a72c905239.21013961"] select').forEach((input) =>
        input.addEventListener("change", this.changeDoor2SheetOrientation, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6267a72c905252.02727997"] .tmcp-range').forEach((input) => {
        var vm = this;
        Object.defineProperty(input, "value", {
          set: function (t) {
            vm.changeDoor2PositionXEvent(t);
            input.setAttribute("value", t);
            form.dispatchEvent(new Event("change"))
          },
          get: function () {
            return input.getAttribute("value");
          },
        });
      });

      form.querySelectorAll('div[data-uniqid="626930c9de35d5.89950433"] input').forEach((input) =>
        input.addEventListener("change", this.changeFittingsEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6267a577abc002.73453783"] input').forEach((input) =>
        input.addEventListener("change", this.changeFittingsMaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6268636725a2b2.40930404"] select').forEach((input) =>
        input.addEventListener("change", this.dispatchMaterialsEvents, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6268636725a2c5.41006929"] select').forEach((input) =>
        input.addEventListener("change", this.changeMaterialArrangementEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6267c6616c1022.10988552"] input').forEach((input) =>
        input.addEventListener("change", this.changeAllMaterialEvent, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6267c6836c1098.51557180"] input').forEach((input) =>
        input.addEventListener("change", this.changeWallMaterial, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6269489cbc6a47.11299589"] input').forEach((input) =>
        input.addEventListener("change", this.changeGatesFrame, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6268597436a4e8.74048409"] input').forEach((input) =>
        input.addEventListener("change", this.changeRoofMaterial, {
          passive: true,
        })
      );

      form.querySelectorAll('div[data-uniqid="6267c6936c1105.52576630"] input').forEach((input) =>
        input.addEventListener("change", this.changeGatesMaterial, {
          passive: true,
        })
      );

      form.addEventListener('change',this.rawConfigSave)

      const saveBtn = document.querySelector(".save-btn-div span");
      if (saveBtn){
        saveBtn.addEventListener("click", ()=>{
          this.rawConfigSave()
          snapSides(generator)
        });
      }

      const resetBtn = document.querySelector(".reset-btn-div span");
      if (resetBtn){
        resetBtn.addEventListener("click", () => {
          window.onbeforeunload = function () {
            window.scrollTo(0,0);
          };
          location.reload()
        });
      }

      document.addEventListener('wpcf7loaded', (e) => {
        snapSides(generator);
        wpcf.submit();
      });

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
