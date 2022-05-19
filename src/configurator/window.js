import WallElement from './wallElement'
import {MeshBasicMaterial,ExtrudeGeometry,Mesh,Group,BoxGeometry,Shape,Vector2} from 'three'

export default class Window extends WallElement {
    constructor(width,height,name){
        super(width,height,new MeshBasicMaterial({color:0xffffff}),name)
        const shape = new Shape()
        shape.moveTo(0,0)
        shape.moveTo(0,height)
        shape.moveTo(width,height)
        shape.moveTo(width,0)

        const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        
        const geometry = new ExtrudeGeometry( shape, extrudeSettings );
        const mesh = new Mesh( geometry, this.material );

        this.object = mesh
    }
}