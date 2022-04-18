import * as THREE from 'three'
import Experience from './Experience.js'
import Interweave from './interweave.js'
import Line from './line.js'
export default class World {
    constructor(_options) {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('groupEnd', (_group) => {
            if (_group.name === 'base') {
                // this.setDummy()
                this.seLine()
            }
        })
    }

    setDummy() {
        this.Interweave = new Interweave()
    }

    seLine() {
        this.Line = new Line()
    }

    resize() { }

    update() {
        if (this.Interweave) {
            this.Interweave.update()
        }

        if (this.Line) {
            this.Line.update()
        }

    }

    destroy() { }
}