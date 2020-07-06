import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import Cube from './Cube';
import Loop from './Loop';

export default class Engine {
    constructor(width = window.innerWidth, height = window.innerHeight, fov = 75) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(fov, width / height, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.cube = new Cube();
        this.loop = new Loop();

        this.update = this.update.bind(this);

        this.init(width, height);
    }

    init(width, height) {
        this.loop.setCallback(this.update);
        this.renderer.setSize(width, height);

        document.body.appendChild(this.renderer.domElement);

        this.scene.add(this.cube.mesh);

        this.camera.position.z = 5;

        this.loop.start();
    }

    update() {
        this.cube.mesh.rotation.x += 0.01;
        this.cube.mesh.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}

