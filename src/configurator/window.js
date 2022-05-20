import WallElement from './wallElement'
import {MeshStandardMaterial,MeshPhysicalMaterial,ExtrudeGeometry,Mesh,Group,BoxGeometry,Shape,DoubleSide,Vector2,Path} from 'three'
import * as Material from './materials'

export default class Window extends WallElement {
    constructor(width,height,name){
        super(width,height,new MeshStandardMaterial({color:0xeeeeee,side:DoubleSide}),name)
        const windowShape = new Shape()
        windowShape.moveTo(0,0)
        windowShape.lineTo(0,height)
        windowShape.lineTo(width,height)
        windowShape.lineTo(width,0)

        const windowInnerPath = new Path()
        windowInnerPath.moveTo(0.05,0.05)
        windowInnerPath.lineTo(0.05,height- 0.05)
        windowInnerPath.lineTo(width - 0.05,height- 0.05)
        windowInnerPath.lineTo(width - 0.05,0.05)

        windowShape.holes = [windowInnerPath]

        const frameGeometry = new ExtrudeGeometry( windowShape, { depth: 0.06, bevelEnabled: false } );
        const frameMesh = new Mesh( frameGeometry, this.material );
        frameMesh.receiveShadow = true
        frameMesh.translateX(-width/2)
        frameMesh.translateZ(-0.03)
                
        const glassMesh = new Mesh( new BoxGeometry(width-0.1,height-0.1,0.02), new MeshPhysicalMaterial({
            color:0x4a6363,
            metalness: 0.3,
            roughness: 0.1,
            clearcoat: 1,
            transparent: true,
            opacity: 0.3,
            reflectivity: 1,
            side:DoubleSide}) );
        glassMesh.translateY(height/2)
        
        const window = new Group()
        window.add(frameMesh)
        window.add(glassMesh)
        window.name = this.name

        this.object = window
    }
}