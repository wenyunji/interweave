import * as THREE from 'three'
import Experience from './Experience.js'
import vertexShader from '../Experience/shaders/interweave/vertax.glsl'
import fragmentShader from '../Experience/shaders/interweave/fragnent.glsl'
export default class Interweave {

    constructor() {

        this.experience = new Experience()
        // this.config = this.experience.config
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.setGeometry()
        this.setColors()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    }

    setColors()
    {
        this.colors = {}

        this.colors.end = {}
        this.colors.end.value = '#1d0ebe'
        this.colors.end.instance = new THREE.Color(this.colors.end.value)

        this.colors.start = {}
        this.colors.start.saturation = 32
        this.colors.start.lightness = 38
        this.colors.start.value = `hsl(0, ${this.colors.start.saturation}%, ${this.colors.start.lightness}%)`
        this.colors.start.instance = new THREE.Color(this.colors.start.value)
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            transparent: true,
            uniforms:
            {
                time: { value: 0 },
                uEndColor: { value: this.colors.end.instance },
                uStartColor: { value: this.colors.start.instance }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {
        this.colors.start.value = `hsl(${this.time.elapsed * 0.01}, ${this.colors.start.saturation}%, ${this.colors.start.lightness}%)`
        this.colors.start.instance.set(this.colors.start.value)

        this.material.uniforms.time.value = this.time.elapsed
    }

}