import * as THREE from 'three'
import Experience from './Experience'
// import vertexShader from './shaders/particles/vertex.glsl'
// import fragmentShader from './shaders/particles/fragment.glsl'
import vertexShader from '../Experience/shaders/line/vertax.glsl'
import fragmentShader from '../Experience/shaders/line/fragnent.glsl'

import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise(Math.random);

function computeCurl(x, y, z) {
    var eps = 0.0001;

    var curl = new THREE.Vector3();

    //Find rate of change in YZ plane
    var n1 = simplex.noise3D(x, y + eps, z);
    var n2 = simplex.noise3D(x, y - eps, z);
    //Average to find approximate derivative
    var a = (n1 - n2) / (2 * eps);
    var n1 = simplex.noise3D(x, y, z + eps);
    var n2 = simplex.noise3D(x, y, z - eps);
    //Average to find approximate derivative
    var b = (n1 - n2) / (2 * eps);
    curl.x = a - b;

    //Find rate of change in XZ plane
    n1 = simplex.noise3D(x, y, z + eps);
    n2 = simplex.noise3D(x, y, z - eps);
    a = (n1 - n2) / (2 * eps);
    n1 = simplex.noise3D(x + eps, y, z);
    n2 = simplex.noise3D(x - eps, y, z);
    b = (n1 - n2) / (2 * eps);
    curl.y = a - b;

    //Find rate of change in XY plane
    n1 = simplex.noise3D(x + eps, y, z);
    n2 = simplex.noise3D(x - eps, y, z);
    a = (n1 - n2) / (2 * eps);
    n1 = simplex.noise3D(x, y + eps, z);
    n2 = simplex.noise3D(x, y - eps, z);
    b = (n1 - n2) / (2 * eps);
    curl.z = a - b;

    return curl;
}

export default class Line {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.count = 2000

        if (this.debug) {
            this.debugFolder = this.debug.addFolder({
                title: 'particles'
            })

            this.debugFolder
                .addInput(
                    this,
                    'count',
                    { min: 100, max: 100000, step: 100 }
                )
                .on('change', () => {
                    this.setGeometry()
                    this.points.geometry = this.geometry
                })
        }

        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    getCurve(start) {
        let scale = 4;
        let points = [];
        points.push(start)
        let currentPoint = start.clone();
        for (let i = 0; i < 600; i++) {
            let v = computeCurl(currentPoint.x / scale, currentPoint.y / scale, currentPoint.z / scale)
            currentPoint.addScaledVector(v, 0.001)
            points.push(currentPoint.clone())
            // points.push(new THREE.Vector3(Math.sin(50 * i / 10), i / 10, 0))
        }
        return points
    }

    setGeometry() {
        if (this.geometry) {
            this.geometry.dispose()
        }

        for (let i = 0; i < 300; i++) {
            let path = new THREE.CatmullRomCurve3(this.getCurve(
                new THREE.Vector3(
                    Math.random() * 0.5,
                    Math.random() * 0.6,
                    Math.random() * 0.3,
                )
            ))
            this.geometry = new THREE.TubeBufferGeometry(path, 400, 0.005, 8, false)

        }

    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: {
                // Here is how we define a float value
                time: {
                    value: 0
                },
                uLight: {
                    value: new THREE.Vector3(0, 0, 0)
                },
                resolution: {
                    value: new THREE.Vector4()
                }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
    }

    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material)
        this.points.position.y = - 5
        this.scene.add(this.points)
    }

    update() {
        this.material.uniforms.time.value = this.time.elapsed
    }
}