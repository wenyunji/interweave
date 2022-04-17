import * as THREE from 'three'
import Experience from './Experience.js'
import Interweave from './interweave.js'
export default class World {
    constructor(_options) {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('groupEnd', (_group) => {
            if (_group.name === 'base') {
                this.setDummy()
            }
        })
    }

    setDummy() {
        this.Interweave = new Interweave()      
    }

    resize() {}

    update() {
        if (this.Interweave) {
            this.Interweave.update()
        }
    }

    destroy() {}
}