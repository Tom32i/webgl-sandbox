import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    DirectionalLight,
    AmbientLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Cube from './Cube';
import Ground from './Ground';
import Segment from './Segment';
import Loop from './Loop';

export default class Engine {
    constructor(width = window.innerWidth, height = window.innerHeight, fov = 45) {
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({ antialias: true });
        this.camera = new PerspectiveCamera(fov, width / height, 1, 1000);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.cube = new Cube();
        this.ground = new Ground();
        this.loop = new Loop();
        this.lights = [
            new DirectionalLight(0xffffff, 0.5),
            new AmbientLight( 0x999999 ),
        ];

        this.lines = [
            new Segment([-5,0,0], [5,0,0], 'red', this.scene),
            new Segment([0,-5,0], [0,5,0], 'green', this.scene),
            new Segment([0,0,-5], [0,0,5], 'blue', this.scene),
        ];

        this.update = this.update.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        window.addEventListener('keydown', this.onKeyDown);

        this.init(width, height);
    }

    init(width, height) {
        this.loop.setCallback(this.update);
        this.renderer.setSize(width, height);

        document.body.appendChild(this.renderer.domElement);

        // Add ground
        this.cube.mesh.position.set(0, 0, 0.5);
        this.scene.add(this.cube.mesh);

        // Add ground
        this.ground.mesh.position.set(0, 0, 0);
        this.ground.mesh.rotation.set(0, 0, 0);
        //this.ground.mesh.rotation.y = 0.5;
        this.scene.add(this.ground.mesh);

        // Add lights
        this.lights[0].position.set(0, 1, 5);
        this.lights.forEach(light => this.scene.add(light));
        //this.scene.add(this.light);

        // Set camera
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(this.cube.mesh.position);

        this.loop.start();
    }

    onKeyDown(event) {
        const { keyCode } = event;
        switch (keyCode) {
            case 38:
                return this.cube.moveY(1);
            case 40:
                return this.cube.moveY(-1);
            case 37:
                return this.cube.moveX(-1);
            case 39:
                return this.cube.moveX(1);
            default:
                console.log(keyCode);
        }
    }

    update(time) {
        this.cube.update(time);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

