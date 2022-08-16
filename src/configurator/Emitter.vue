<!-- Component used for event testing purposes only -->
<template>
  <div class="test_container">
    <h3>Gate 1</h3>
    <form
      id="example1"
      @submit.prevent="sendChange('example1', 'gate', 'gate1', 2, 2, 0, 0, 0)"
      @change="sendChange('example1', 'gate', 'gate1', 2, 2, 0, 0, 0)"
    >
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
      <select name="height" id="height">
        <option value="1.8">180cm</option>
        <option value="1.9">190cm</option>
        <option value="2.0">200cm</option>
        <option value="2.5">250cm</option>
      </select>
    </form>
    <button @click="sendRemove('gate1', 'example1')">REMOVE GATE</button>
    <hr />
    <h3>window1</h3>
    <form
      id="example2"
      @submit.prevent="sendChange('example2', 'window', 'window1', 1, 1, 2, 1)"
      @change="sendChange('example2', 'window', 'window1', 1, 1, 2, 1)"
    >
      <select name="wallId" id="wallId">
        <option value="0">Front</option>
        <option value="1">Back</option>
        <option value="2">Left</option>
        <option value="3">Right</option>
      </select>
    </form>
    <button @click="sendRemove('window1', 'example2')">REMOVE WINDOW</button>
    <hr />
    <h3>Roof type</h3>
    <form
      id="example3"
      @submit.prevent="sendRoofAdd('example3', 'roof', 'roof')"
      @change="sendRoofAdd('example3', 'roof', 'roof')"
    >
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
    <form id="example4" @change="sendReinit('example4')">
      Width:
      <input type="range" name="width" id="width" min="1" max="7" value="6" />
      <br />
      Length:
      <input type="range" name="length" id="length" min="1" max="7" value="5" />
      <br />
    </form>
    <hr />
    <h3>Walls color</h3>
    <form id="example5" @change="sendUpdate('example5', 'walls', '')">
      <select name="material" id="material">
        <option value="RAL9010">RAL9010</option>
        <option value="RAL9010_H">RAL9010 horizontal</option>
        <option value="WOOD_DARK_SHINE">WOOD_DARK_SHINE</option>
        <option value="WOOD_LIGHT">WOOD_LIGHT</option>
        <option value="BTX6020">BTX6020</option>
      </select>
    </form>
    <h3>window2</h3>
    <form
      id="example6"
      @submit.prevent="sendChange('example6', 'window', 'window2', 1, 1)"
      @change="sendChange('example6', 'window', 'window2', 1, 1)"
    >
      <select name="wallId" id="wallId">
        <option value="0">Front</option>
        <option value="1">Back</option>
        <option value="2">Left</option>
        <option value="3">Right</option>
      </select>
      <select name="material" id="material">
        <option value="WHITE">WHITE</option>
        <option value="BROWN">BROWN</option>
        <option value="GRAY">GRAY</option>
        <option value="GOLD_OAK">Złoty dąb</option>
        <option value="DARK_WALNUT">Ciemny orzech</option>
      </select>
      <input
        id="x"
        name="x"
        type="range"
        min="0"
        max="7"
        value="0.2"
        step="0.005"
        @input="sendChange('example6', 'window', 'window2', 1, 1)"
      />
      <input
        id="y"
        name="y"
        type="range"
        min="0"
        max="3"
        value="0.2"
        step="0.005"
        @input="sendChange('example6', 'window', 'window2', 1, 1)"
      />
    </form>
    <h3>fittings</h3>
    <form
      id="example7"
      @submit.prevent="
        sendChange('example7', 'fittings', 'window2', 0, 0, 0, 0)
      "
    >
      <select name="material" id="material">
        <option value="RAL9010">RAL9010</option>
        <option value="RAL9010_H">RAL9010 horizontal</option>
        <option value="WOOD_DARK_SHINE">WOOD_DARK_SHINE</option>
        <option value="WOOD_LIGHT">WOOD_LIGHT</option>
        <option value="BTX6020">BTX6020</option>
      </select>
      <button>ADD FITTINGS</button>
    </form>
    <button @click="sendRemove('', 'example7', 'fittings')">
      REMOVE FITTINGS
    </button>
    <h3>door1</h3>
    <form
      id="example8"
      @submit.prevent="sendChange('example8', 'door', 'door1', 1, 1.8, 3, 0)"
      @change="sendChange('example8', 'door', 'door1', 1, 1.8, 3, 0)"
    >
      <select name="wallId" id="wallId">
        <option value="0">Front</option>
        <option value="1">Back</option>
        <option value="2">Left</option>
        <option value="3">Right</option>
      </select>
      <select name="material" id="material">
        <option value="RAL9010">RAL9010</option>
        <option value="RAL9010_H">RAL9010 horizontal</option>
        <option value="WOOD_DARK_SHINE">WOOD_DARK_SHINE</option>
        <option value="WOOD_LIGHT">WOOD_LIGHT</option>
        <option value="BTX6020">BTX6020</option>
      </select>
    </form>
    <button @click="sendRemove('door1', 'example8')">REMOVE GATE</button>
  </div>
</template>

<script>
export default {
  name: 'Emitter',
  methods: {
    sendChange(formNr, type, name, width, height, x, y, wall) {
      var object = {
        type: type,
        name: name,
        width: width,
        height: height,
        x: x,
        y: y,
        wallId: 'front',
      }
      const data = new FormData(document.forms[formNr])
      data.forEach((value, key) => {
        if (key == 'x' || key == 'y' || key == 'width' || key == 'height') {
          value = parseFloat(value)
        }
        object[key] = value
      })
      delete object.width
      this.$store.commit('update', { eventType: 'update', ...object })
    },

    sendRemove(name, formNr, type = '') {
      var object = {
        name: name,
        type: type,
      }
      const data = new FormData(document.forms[formNr])
      data.forEach((value, key) => {
        object[key] = value
      })
      console.log(object.wallId, object.name)
      this.$store.commit('remove', object)
    },

    sendRoofAdd(formNr, type, name) {
      var object = {
        type: type,
        name: name,
      }
      const data = new FormData(document.forms[formNr])
      data.forEach((value, key) => {
        object[key] = value
      })
      this.$store.commit('update', { ...object })
    },

    sendUpdate(formNr, type, name) {
      var object = {
        type: type,
        name: name,
        material: 'RAL9010',
      }
      const data = new FormData(document.forms[formNr])
      data.forEach((value, key) => {
        object[key] = value
      })
      console.log(object)
      this.$store.commit('update', { ...object })
    },

    sendReinit(formNr) {
      var object = {
        material: 'RAL9010',
      }
      const data = new FormData(document.forms[formNr])
      data.forEach((value, key) => {
        object[key] = parseFloat(value)
      })

      this.$store.commit('reInit', object)
    },
    changeEventForm: function (e) {
      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries(),
      )

      Object.keys(formData).forEach((key) => {
        var object

        console.log(key, formData[key])

        // By default remove fitting
        if (!formData['tmcp_radio_87']) {
          object = {}
          object.type = 'fittings'
          this.$store.commit('remove', { ...object })
          object = null
        }

        switch (key) {
          case 'tm-epo-counter':
            break
          case 'tmcp_radio_0': //Rodzaje dachu
            object = {}
            object.type = 'roof'
            object.roofType = 'gable'

            if (formData[key] == 'Spad w tył_1') {
              object.roofType = 'back'
            }

            if (formData[key] == 'Spad w przód_2') {
              object.roofType = 'front'
            }

            if (formData[key] == 'Spad w prawo_3') {
              object.roofType = 'right'
            }

            if (formData[key] == 'Spad w lewo_4') {
              object.roofType = 'left'
            }

            this.$store.commit('update', { ...object })
            break
          case 'tmcp_select_1': //Szerokość
            object = {}
            object.width = parseInt(formData[key].split(' ')[0])

            this.$store.commit('reInit', { ...object })
            break
          case 'tmcp_select_2': //Długość
            object = {}
            object.length = parseInt(formData[key].split(' ')[0])

            this.$store.commit('reInit', { ...object })

            break
          case 'tmcp_select_3':
            object = {}
            object.length = parseInt(formData[key].split(' ')[0])

            this.$store.commit('reInit', { ...object })

            break
          case 'tmcp_radio_4': //Brama 1 - Typ bramy
            object = {}
            object.type = 'gate'
            object.name = 'gate1'
            object.gateType = 'double'
            object.wallId = 0
            console.log('----', formData[key], '----')

            if (formData[key] == 'Dwuskrzydłowa_0') {
              object.gateType = 'double'
            }

            if (formData[key] == 'Uchylna_1') {
              object.gateType = 'tilted'
            }

            if (formData[key] == 'Uchylna - szeroki panel_2') {
              object.gateType = 'wide'
            }

            if (formData[key] == 'Bez bramy - otwarty przód_3') {
              object.gateType = 'empty'
            }

            if (formData[key] == 'Zamiast bramy ściana_4') {
              this.$store.commit('remove', { ...object })
              break
            }

            this.$store.commit('update', { ...object })
            break

          case 'tmcp_select_5': //Brama 1 - szerokość
            if (formData['tmcp_radio_4'] == 'Zamiast bramy ściana_4') {
              break
            }
            object = {}
            object.type = 'gate'
            object.name = 'gate1'
            object.width = parseInt(formData[key].split(' ')[0])
            object.width = object.width / 100

            this.$store.commit('update', { ...object })

            break
          case 'tmcp_select_6': //Brama 1 - wysokość
            if (formData['tmcp_radio_4'] == 'Zamiast bramy ściana_4') {
              break
            }
            object = {}
            object.type = 'gate'
            object.name = 'gate1'
            object.wallId = 0
            object.height = parseInt(formData[key].split(' ')[0])
            object.height = object.height / 100

            this.$store.commit('update', { ...object })
            break
          case 'tmcp_select_7': //Ułoenie blachy
            if (formData['tmcp_radio_4'] == 'Zamiast bramy ściana_4') {
              break
            }

            object = {}
            //RAL 9010
            object.type = 'gate'
            object.name = 'gate1'
            object.wallId = 0
            if (formData['tmcp_radio_21']) {
              object.material = formData['tmcp_radio_21']
                .split('_')[0]
                .replace(' ', '')
            } else if (formData['tmcp_radio_30']) {
              object.material = formData['tmcp_radio_30']
                .split('_')[0]
                .replace(' ', '')
            } else {
              object.material = 'RAL9010'
            }

            if (formData[key] == 'Pionowe_0') {
              object.material = object.material + ''
            }

            if (formData[key] == 'Poziome_1') {
              object.material = object.material + '_H'
            }

            this.$store.commit('update', { ...object })

            break
          case 'tmcp_select_8':
            break
          case 'tmcp_radio_9': //Brama 2 - Typ bramy
            object = {}
            object.type = 'gate'
            object.name = 'gate2'
            object.gateType = 'double'
            object.wallId = 0

            if (formData[key] == 'Dwuskrzydłowa_0') {
              object.gateType = 'double'
            }

            if (formData[key] == 'Uchylna_1') {
              object.gateType = 'tilted'
            }

            if (formData[key] == 'Uchylna - szeroki panel_2') {
              object.gateType = 'wide'
            }

            if (formData[key] == 'Bez bramy - otwarty przód_3') {
              object.gateType = 'empty'
            }

            if (formData[key] == 'Zamiast bramy ściana_4') {
              delete object.gateType
              this.$store.commit('remove', { ...object })
              break
            }

            this.$store.commit('update', { ...object })
            break
          case 'tmcp_select_10':
            if (formData['tmcp_radio_9'] == 'Zamiast bramy ściana_4') {
              break
            }
            object = {}
            object.type = 'gate'
            object.name = 'gate2'
            object.width = parseInt(formData[key].split(' ')[0])
            object.width = object.width / 100

            this.$store.commit('update', { ...object })

            break
          case 'tmcp_select_11':
            if (formData['tmcp_radio_9'] == 'Zamiast bramy ściana_4') {
              break
            }
            object = {}
            object.type = 'gate'
            object.name = 'gate2'
            object.height = parseInt(formData[key].split(' ')[0])
            object.height = object.height / 100

            this.$store.commit('update', { ...object })

            break
          case 'tmcp_radio_87':
            object = {}
            //RAL 5010_4
            object.type = 'fittings'
            object.visible = true
            object.material = formData[key].split('_')[0].replace(' ', '')
            this.$store.commit('updateMaterial', { ...object })
            break
          case 'tmcp_checkbox_86_0':
            object = {}
            object.type = 'fittings'
            object.visible = true

            this.$store.commit('update', { ...object })
            break

          case 'tmcp_select_19': //ułożenie poszycie
            object = {}

            if (formData['tmcp_radio_21']) {
              object.material = formData['tmcp_radio_21']
                .split('_')[0]
                .replace(' ', '')
            } else {
              object.material = 'RAL9010'
            }
            object.type = 'roof'
            this.$store.commit('updateMaterial', { ...object })

            if (formData[key] == 'W pionie_0') {
              object.material = object.material + ''
            }

            if (formData[key] == 'W poziomie_1') {
              object.material = object.material + '_H'
            }
            object.type = 'walls'
            this.$store.commit('updateMaterial', { ...object })

            break
          case 'tmcp_radio_21': //jednolity kolor poszycie
            object = {}
            if (formData[key]) {
              object.material = formData[key].split('_')[0].replace(' ', '')
            } else {
              object.material = 'RAL9010'
            }
            object.type = 'roof'

            this.$store.commit('updateMaterial', { ...object })

            object.type = 'walls'
            if (formData['tmcp_select_19'] == 'W poziomie_1') {
              object.material = object.material + '_H'
            }
            this.$store.commit('updateMaterial', { ...object })
            break

          case 'tmcp_radio_24': //kolor dachu
            object = {}
            if (formData[key]) {
              object.material = formData[key].split('_')[0].replace(' ', '')
            } else {
              object.material = 'RAL9010'
            }
            object.type = 'roof'

            this.$store.commit('updateMaterial', { ...object })
            break

          case 'tmcp_radio_27': //kolor ściany
            object = {}
            if (formData[key]) {
              object.material = formData[key].split('_')[0].replace(' ', '')
            } else {
              object.material = 'RAL9010'
            }
            object.type = 'walls'

            if (formData['tmcp_select_19'] == 'W poziomie_1') {
              object.material = object.material + '_H'
            }

            this.$store.commit('updateMaterial', { ...object })
            break

          default:
            console.log(key, formData[key])
        }
      })
    },
  },
  mounted: function () {
    var form = document.querySelector('form.cart')
    if (document.querySelector('form.cart')) {
      form.addEventListener('change', this.changeEventForm, { passive: true })
    }
  },
}
</script>

<style>
.test_container {
  max-height: 100vh;
  width: 300px;
  overflow-y: scroll;
}
</style>
