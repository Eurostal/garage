import WallElement from './wallElement'
import {MeshBasicMaterial,ExtrudeGeometry,Mesh,Group,BoxGeometry,Shape,Vector2} from 'three'

export default class Window extends WallElement {
    constructor(width,height){
        super(width,height,new MeshBasicMaterial({color:0xffffff}))
        const shape = new Shape()
        shape.moveTo(0,0)
        shape.moveTo(0,height)
        shape.moveTo(width,height)
        shape.moveTo(width,0)

        const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        
        const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
        const mesh = new THREE.Mesh( geometry, this.material );

        this.object = mesh
    }
}