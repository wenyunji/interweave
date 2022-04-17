import * as THREE from 'three'
import Experience from './Experience.js'
import vertexShader from '../Experience/shaders/vertax.glsl'
import fragmentShader from '../Experience/shaders/fragnent.glsl'
export default class Interweave {

    constructor() {

        this.experience = new Experience()
        // this.config = this.experience.config
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(1, 512, 512)
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {
        // Time
        // this.time+=0.05
        this.material.uniforms.time.value += this.time.delta/500
    }

}