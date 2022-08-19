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
      },
    };
  },
  methods: {
    changeRoof: function (name = "Spad w tył_1", action = "update") {
      let object = {
        type: "roof",
        roofType: this.roofNameTranslation[name],
      };
      this.$store.commit(action, { ...object });
    },
    changeRoofProxy: function (e) {
      this.changeRoof(e.target.value);
    },
    changeWindow: function (name, action = "update") {
      let object = {
        type: "window",
        name: name,
        wallId: this.selectWall(name),
      };
      this.$store.commit(action, { ...object });
    },
    changeWindowProxy: function (e) {
      console.log(e.target.value);
      this.changeWindow("window", "window1");
    },
    changeEventForm: function (e) {
      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );

      Object.keys(formData).forEach((key) => {
        var object;

        console.log(key, formData[key]);

        // Default removes

        // fitting
        if (!formData["tmcp_radio_87"]) {
          object = {};
          object.type = "fittings";
          this.$store.commit("remove", { ...object });
          object = null;
        }

        //windows
        if (!formData["tmcp_checkbox_35_0"]) {
          object = {};
          object.type = "window";
          object.name = "window1";
          object.wallId = this.selectWall(formData["tmcp_select_36"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }
        if (!formData["tmcp_checkbox_40_0"]) {
          object = {};
          object.type = "window";
          object.name = "window2";
          object.wallId = this.selectWall(formData["tmcp_select_42"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }
        if (!formData["tmcp_checkbox_46_0"]) {
          object = {};
          object.type = "window";
          object.name = "window3";
          object.wallId = this.selectWall(formData["tmcp_select_48"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }
        if (!formData["tmcp_checkbox_52_0"]) {
          object = {};
          object.type = "window";
          object.name = "window4";
          object.wallId = this.selectWall(formData["tmcp_select_54"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }
        if (!formData["tmcp_checkbox_58_0"]) {
          object = {};
          object.type = "window";
          object.name = "window5";
          object.wallId = this.selectWall(formData["tmcp_select_60"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }

        //doors
        if (!formData["tmcp_checkbox_65_0"]) {
          object = {};
          object.type = "door";
          object.name = "door1";
          object.wallId = this.selectWall(formData["tmcp_select_68"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }

        if (!formData["tmcp_checkbox_73_0"]) {
          object = {};
          object.type = "door";
          object.name = "door2";
          object.wallId = this.selectWall(formData["tmcp_select_76"]);
          this.$store.commit("remove", { ...object });
          object = null;
        }

        switch (key) {
          case "tm-epo-counter":
            break;
          case "tmcp_radio_0": //Rodzaje dachu
            this.changeRoof(formData["tmcp_radio_0"]);
            break;
          case "tmcp_select_1": //Szerokość
            object = {};
            object.width = parseFloat(
              formData[key].split(" ")[0].replace(",", ".")
            );

            this.$store.commit("reInit", { ...object });
            break;
          case "tmcp_select_2": //Długość
            object = {};
            object.length = parseFloat(
              formData[key].split(" ")[0].replace(",", ".")
            );

            this.$store.commit("reInit", { ...object });

            break;
          case "tmcp_select_3":
            object = {};
            object.length = parseFloat(formData[key].split(" ")[0]);

            this.$store.commit("reInit", { ...object });

            break;
          case "tmcp_radio_4": //Brama 1 - Typ bramy
            object = {};
            object.type = "gate";
            object.name = "gate1";
            object.gateType = "double";
            object.wallId = 0;
            if (formData["tmcp_range_8"]) {
              object.x = formData["tmcp_range_8"].value / 100;
            }
            console.log("----", formData[key], "----");

            if (formData[key] == "Dwuskrzydłowa_0") {
              object.gateType = "double";
            }

            if (formData[key] == "Uchylna_1") {
              object.gateType = "tilted";
            }

            if (formData[key] == "Uchylna - szeroki panel_2") {
              object.gateType = "wide";
            }

            if (formData[key] == "Bez bramy - otwarty przód_3") {
              object.gateType = "empty";
            }

            if (formData[key] == "Zamiast bramy ściana_4") {
              this.$store.commit("remove", { ...object });
              break;
            }

            this.$store.commit("update", { ...object });
            break;

          case "tmcp_select_5": //Brama 1 - szerokość
            if (formData["tmcp_radio_4"] == "Zamiast bramy ściana_4") {
              break;
            }
            object = {};
            object.wallId = 0;
            object.type = "gate";
            object.name = "gate1";
            object.width = parseFloat(formData[key].split(" ")[0]);
            object.width = object.width / 100;

            this.$store.commit("update", { ...object });

            break;
          case "tmcp_select_6": //Brama 1 - wysokość
            if (formData["tmcp_radio_4"] == "Zamiast bramy ściana_4") {
              break;
            }
            object = {};
            object.type = "gate";
            object.name = "gate1";
            object.wallId = 0;
            object.height = parseFloat(formData[key].split(" ")[0]);
            object.height = object.height / 100;

            this.$store.commit("update", { ...object });
            break;
          case "tmcp_select_7": //Ułoenie blachy
            if (formData["tmcp_radio_4"] == "Zamiast bramy ściana_4") {
              break;
            }

            object = {};
            //RAL 9010
            object.type = "gate";
            object.name = "gate1";
            object.wallId = 0;
            if (formData["tmcp_radio_21"]) {
              object.material = formData["tmcp_radio_21"]
                .split("_")[0]
                .replace(" ", "");
            } else if (formData["tmcp_radio_30"]) {
              object.material = formData["tmcp_radio_30"]
                .split("_")[0]
                .replace(" ", "");
            } else {
              object.material = "RAL9010";
            }

            if (formData[key] == "Pionowe_0") {
              object.material = object.material + "";
            }

            if (formData[key] == "Poziome_1") {
              object.material = object.material + "_H";
            }

            this.$store.commit("update", { ...object });

            break;
          case "tmcp_select_8":
            break;
          case "tmcp_radio_9": //Brama 2 - Typ bramy
            object = {};
            object.type = "gate";
            object.name = "gate2";
            object.gateType = "double";
            object.wallId = 0;

            if (formData[key] == "Dwuskrzydłowa_0") {
              object.gateType = "double";
            }

            if (formData[key] == "Uchylna_1") {
              object.gateType = "tilted";
            }

            if (formData[key] == "Uchylna - szeroki panel_2") {
              object.gateType = "wide";
            }

            if (formData[key] == "Bez bramy - otwarty przód_3") {
              object.gateType = "empty";
            }

            if (formData[key] == "Zamiast bramy ściana_4") {
              delete object.gateType;
              this.$store.commit("remove", { ...object });
              break;
            }

            this.$store.commit("update", { ...object });
            break;
          case "tmcp_select_10":
            if (formData["tmcp_radio_9"] == "Zamiast bramy ściana_4") {
              break;
            }
            object = {};
            object.type = "gate";
            object.name = "gate2";
            object.width = parseFloat(formData[key].split(" ")[0]);
            object.width = object.width / 100;
            object.wallId = 0;

            this.$store.commit("update", { ...object });

            break;
          case "tmcp_select_11":
            if (formData["tmcp_radio_9"] == "Zamiast bramy ściana_4") {
              break;
            }
            object = {};
            object.type = "gate";
            object.name = "gate2";
            object.height = parseFloat(formData[key].split(" ")[0]);
            object.height = object.height / 100;
            object.wallId = 0;

            this.$store.commit("update", { ...object });

            break;

          case "tmcp_select_12": //Brama2 Ułoenie blachy
            if (formData["tmcp_radio_9"] == "Zamiast bramy ściana_4") {
              break;
            }

            object = {};
            object.type = "gate";
            object.name = "gate2";
            object.wallId = 0;
            if (formData["tmcp_radio_21"]) {
              object.material = formData["tmcp_radio_21"]
                .split("_")[0]
                .replace(" ", "");
            } else if (formData["tmcp_radio_30"]) {
              object.material = formData["tmcp_radio_30"]
                .split("_")[0]
                .replace(" ", "");
            } else {
              object.material = "RAL9010";
            }

            if (formData[key] == "Pionowe_0") {
              object.material = object.material + "";
            }

            if (formData[key] == "Poziome_1") {
              object.material = object.material + "_H";
            }

            this.$store.commit("update", { ...object });

            break;

          case "tmcp_radio_89":
            object = {};
            //RAL 5010_4
            object.type = "fittings";
            object.material = formData[key].split("_")[0].replace(" ", "");
            this.$store.commit("updateMaterial", { ...object });
            break;
          case "tmcp_checkbox_88_0":
            object = {};
            object.type = "fittings";
            object.visible = true;

            this.$store.commit("update", { ...object });
            break;

          case "tmcp_select_19": //ułożenie poszycie
            object = {};

            if (formData["tmcp_radio_21"]) {
              object.material = formData["tmcp_radio_21"]
                .split("_")[0]
                .replace(" ", "");
            } else {
              object.material = "RAL9010";
            }
            object.type = "roof";
            this.$store.commit("updateMaterial", { ...object });

            if (formData[key] == "W pionie_0") {
              object.material = object.material + "";
            }

            if (formData[key] == "W poziomie_1") {
              object.material = object.material + "_H";
            }
            object.type = "walls";
            this.$store.commit("updateMaterial", { ...object });

            break;
          case "tmcp_radio_21": //jednolity kolor poszycie
            object = {};
            if (formData[key]) {
              object.material = formData[key].split("_")[0].replace(" ", "");
            } else {
              object.material = "RAL9010";
            }
            object.type = "roof";

            this.$store.commit("updateMaterial", { ...object });

            object.type = "walls";
            if (formData["tmcp_select_19"] == "W poziomie_1") {
              object.material = object.material + "_H";
            }
            this.$store.commit("updateMaterial", { ...object });
            break;

          case "tmcp_radio_24": //kolor dachu
            object = {};
            if (formData[key]) {
              object.material = formData[key].split("_")[0].replace(" ", "");
            } else {
              object.material = "RAL9010";
            }
            object.type = "roof";

            this.$store.commit("updateMaterial", { ...object });
            break;

          case "tmcp_radio_27": //kolor ściany
            object = {};
            if (formData[key]) {
              object.material = formData[key].split("_")[0].replace(" ", "");
            } else {
              object.material = "RAL9010";
            }
            object.type = "walls";

            if (formData["tmcp_select_19"] == "W poziomie_1") {
              object.material = object.material + "_H";
            }

            this.$store.commit("updateMaterial", { ...object });
            break;

          //window1
          case "tmcp_checkbox_34_0":
            object = {};
            object.name = "window1";
            object.type = "window";
            object.wallId = this.selectWall(formData["tmcp_select_36"]);

            if (formData["tmcp_select_35"]) {
              let sizeData = formData["tmcp_select_35"].split("x");
              object.width = sizeData[0] / 100;
              object.height = sizeData[1].split("cm")[0] / 100;
            }
            if (formData["tmcp_radio_37"]) {
              if (formData["tmcp_radio_37"] == "Brązowy_0")
                object.material = "BROWN";
              if (formData["tmcp_radio_37"] == "Szary_1")
                object.material = "GRAY";
              if (formData["tmcp_radio_37"] == "Biały_2")
                object.material = "WHITE";
              if (formData["tmcp_radio_37"] == "Ciemny orzech_3")
                object.material = "DARK_WALNUT";
              if (formData["tmcp_radio_37"] == "Złoty dąb_4")
                object.material = "GOLD_OAK";
            } else {
              object.material = "WHITE";
            }

            object.x = 0.1;
            object.y = 1;

            this.$store.commit("update", { ...object });

            break;

          //window2
          case "tmcp_checkbox_40_0":
            object = {};
            object.name = "window2";
            object.type = "window";
            object.wallId = this.selectWall(formData["tmcp_select_42"]);

            if (formData["tmcp_select_41"]) {
              let sizeData = formData["tmcp_select_41"].split("x");
              object.width = sizeData[0] / 100;
              object.height = sizeData[1].split("cm")[0] / 100;
            }
            if (formData["tmcp_radio_43"]) {
              if (formData["tmcp_radio_43"] == "Brązowy_0")
                object.material = "BROWN";
              if (formData["tmcp_radio_43"] == "Szary_1")
                object.material = "GRAY";
              if (formData["tmcp_radio_43"] == "Biały_2")
                object.material = "WHITE";
              if (formData["tmcp_radio_43"] == "Ciemny orzech_3")
                object.material = "DARK_WALNUT";
              if (formData["tmcp_radio_43"] == "Złoty dąb_4")
                object.material = "GOLD_OAK";
            } else {
              object.material = "WHITE";
            }
            object.x = 0.1;
            object.y = 1;

            this.$store.commit("update", { ...object });

            break;

          //window3
          case "tmcp_checkbox_46_0":
            object = {};
            object.name = "window3";
            object.type = "window";
            object.wallId = this.selectWall(formData["tmcp_select_48"]);

            if (formData["tmcp_select_47"]) {
              let sizeData = formData["tmcp_select_47"].split("x");
              object.width = sizeData[0] / 100;
              object.height = sizeData[1].split("cm")[0] / 100;
            }
            if (formData["tmcp_radio_49"]) {
              if (formData["tmcp_radio_49"] == "Brązowy_0")
                object.material = "BROWN";
              if (formData["tmcp_radio_49"] == "Szary_1")
                object.material = "GRAY";
              if (formData["tmcp_radio_49"] == "Biały_2")
                object.material = "WHITE";
              if (formData["tmcp_radio_49"] == "Ciemny orzech_3")
                object.material = "DARK_WALNUT";
              if (formData["tmcp_radio_49"] == "Złoty dąb_4")
                object.material = "GOLD_OAK";
            } else {
              object.material = "WHITE";
            }
            object.x = 0.1;
            object.y = 1;

            this.$store.commit("update", { ...object });

            break;

          //window4
          case "tmcp_checkbox_52_0":
            object = {};
            object.name = "window4";
            object.type = "window";
            object.wallId = this.selectWall(formData["tmcp_select_54"]);

            if (formData["tmcp_select_53"]) {
              let sizeData = formData["tmcp_select_53"].split("x");
              object.width = sizeData[0] / 100;
              object.height = sizeData[1].split("cm")[0] / 100;
            }
            if (formData["tmcp_radio_55"]) {
              if (formData["tmcp_radio_55"] == "Brązowy_0")
                object.material = "BROWN";
              if (formData["tmcp_radio_55"] == "Szary_1")
                object.material = "GRAY";
              if (formData["tmcp_radio_55"] == "Biały_2")
                object.material = "WHITE";
              if (formData["tmcp_radio_55"] == "Ciemny orzech_3")
                object.material = "DARK_WALNUT";
              if (formData["tmcp_radio_55"] == "Złoty dąb_4")
                object.material = "GOLD_OAK";
            } else {
              object.material = "WHITE";
            }
            object.x = 0.1;
            object.y = 1;

            this.$store.commit("update", { ...object });

            break;

          //window5
          case "tmcp_checkbox_58_0":
            object = {};
            object.name = "window5";
            object.type = "window";
            object.wallId = this.selectWall(formData["tmcp_select_60"]);
            if (formData["tmcp_select_59"]) {
              let sizeData = formData["tmcp_select_59"].split("x");
              object.width = sizeData[0] / 100;
              object.height = sizeData[1].split("cm")[0] / 100;
            }
            if (formData["tmcp_radio_61"]) {
              if (formData["tmcp_radio_61"] == "Brązowy_0")
                object.material = "BROWN";
              if (formData["tmcp_radio_61"] == "Szary_1")
                object.material = "GRAY";
              if (formData["tmcp_radio_61"] == "Biały_2")
                object.material = "WHITE";
              if (formData["tmcp_radio_61"] == "Ciemny orzech_3")
                object.material = "DARK_WALNUT";
              if (formData["tmcp_radio_61"] == "Złoty dąb_4")
                object.material = "GOLD_OAK";
            } else {
              object.material = "WHITE";
            }
            object.x = 0.1;
            object.y = 1;

            this.$store.commit("update", { ...object });
            break;

          //doors

          //door1
          case "tmcp_checkbox_65_0":
            object = {};
            object.name = "door1";
            object.type = "door";
            object.wallId = this.selectWall(formData["tmcp_select_68"]);
            object.width = 0.96;
            object.height = 2;

            if (formData["tmcp_select_66"] == "Z prawej_1") {
              object.handleSide = "right";
            } else {
              object.handleSide = "left";
            }

            if (formData["tmcp_radio_70"]) {
              object.material = formData["tmcp_radio_70"]
                .split("_")[0]
                .replace(" ", "");
            } else {
              object.material = "RAL9010";
            }
            if (formData["tmcp_select_67"] == "W poziomie_1") {
              object.material = object.material + "_H";
            }

            object.x = 0.1;
            object.y = 0;

            this.$store.commit("update", { ...object });
            break;

          //door2
          case "tmcp_checkbox_73_0":
            object = {};
            object.name = "door2";
            object.type = "door";
            object.wallId = this.selectWall(formData["tmcp_select_76"]);
            object.width = 0.96;
            object.height = 2;

            if (formData["tmcp_select_74"] == "Z prawej_1") {
              object.handleSide = "right";
            } else {
              object.handleSide = "left";
            }

            if (formData["tmcp_radio_78"]) {
              object.material = formData["tmcp_radio_78"]
                .split("_")[0]
                .replace(" ", "");
            } else {
              object.material = "RAL9010";
            }
            if (formData["tmcp_select_75"] == "W poziomie_1") {
              object.material = object.material + "_H";
            }

            object.x = 0.1;
            object.y = 0;

            this.$store.commit("update", { ...object });
            break;

          default:
            console.log(key, formData[key]);
        }
      });

      let target;
      let setAttribute;
      let object = {};
      // window1 szerokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607e27.12468774"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_36"]);
          object.x = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window1 wysokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607e37.33496203"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_36"]);
          object.y = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window2 szerokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607e72.58094923"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_42"]);
          object.x = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window2 wysokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607e84.50408653"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_42"]);
          object.y = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window3 szerokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607ec0.38279999"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_48"]);
          object.x = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window3 wysokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607ed0.11804888"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_48"]);
          object.y = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window4 szerokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607f13.98580250"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_54"]);
          object.x = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window4 wysokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607f29.14038358"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_54"]);
          object.y = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window5 szerokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607f67.37945639"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_60"]);
          object.x = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };

      // window5 wysokosc
      target = document.querySelector(
        '[data-uniqid="626666fc607f79.78538581"] div[aria-valuenow]'
      );
      setAttribute = target.setAttribute;
      // override setAttribte
      target.setAttribute = (key, value) => {
        if (key == "aria-valuenow") {
          object = {};
          object.name = "window1";
          object.type = "window";
          object.wallId = this.selectWall(formData["tmcp_select_60"]);
          object.y = parseFloat(value) / 100;
          this.$store.commit("update", { ...object });
        }
        // use call, to set the context and prevent illegal invocation errors
        setAttribute.call(target, key, value);
      };
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

      form
        .querySelectorAll('div[data-uniqid="62581d466f2312.18396791"] input')
        .forEach((input) =>
          input.addEventListener("change", this.changeRoofProxy, {
            passive: true,
          })
        );

      let changeWindowProxy = this.changeWindow;
      form
        .querySelectorAll('div[data-uniqid="626666fc607df3.98247608"] input')
        .forEach((input) =>
          input.addEventListener("change", this.changeWindowProxy, {
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
