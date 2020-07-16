import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight } from 'three';
import Cube from './Cube';
import Loop from './Loop';

export default class Engine {
    constructor(width = window.innerWidth, height = window.innerHeight, fov = 75) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(fov, width / height, 0.1, 1000);
        this.renderer = new WebGLRenderer({ antialias: true });
        this.cube = new Cube();
        this.loop = new Loop();
        this.light = new DirectionalLight(0xffffff, 1.0);

        this.update = this.update.bind(this);

        this.init(width, height);
    }

    init(width, height) {
        this.loop.setCallback(this.update);
        this.renderer.setSize(width, height);

        document.body.appendChild(this.renderer.domElement);

        this.cube.mesh.rotation.x = 0.5;
        this.scene.add(this.cube.mesh);

        this.light.position.set(0, 0, 50);
        this.scene.add(this.light);

        this.camera.position.z = 5;

        this.loop.start();
    }

    update(time) {
        //this.cube.mesh.rotation.x += 0.1;
        this.cube.update(time);

        this.renderer.render(this.scene, this.camera);
    }
}

