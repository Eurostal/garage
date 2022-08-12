import { MeshStandardMaterial, Color } from "three";
import * as MaterialBase from "./materialsBases";

export default class Material extends MeshStandardMaterial {
  constructor(customType = "SOLID", colorValue = 0xd1d1d1, horizontal = false) {
    super();
    this.customType = customType;
    this.color = new Color(colorValue);
    this.horizontal = horizontal;
    this.adjustMaterial();
  }

  adjustMaterial() {
    switch (this.customType) {
      case "RAL":
        this.setValues(MaterialBase.RAL);
        break;
      case "BTX":
        this.setValues(MaterialBase.BTX);
        break;
      case "WOOD":
        this.setValues(MaterialBase.WOOD);
        break;
      case "WOOD_SHINE":
        this.setValues(MaterialBase.WOOD_SHINE);
        break;
      case "SOLID":
        this.setValues(MaterialBase.SOLID);
        break;

      default:
        break;
    }

    if (this.horizontal) {
      if (this.map) {
        this.map = this.map.clone();
        this.map.rotation = 0;
      }
      if (this.normalMap) {
        this.normalMap = this.normalMap.clone();
        this.normalMap.rotation = 0;
      }
      if (this.roughnessMap) {
        this.roughnessMap = this.roughnessMap.clone();
        this.roughnessMap.rotation = 0;
      }
    }
  }
}
