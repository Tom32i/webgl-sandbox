import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
} from 'three';
import Segment from './Segment';
import EasedValue from './EasedValue';
import { textures } from '../../assets/image/cube';

export default class Cube {
    constructor(size = 1) {
        this.geometry = new BoxGeometry(size, size, size);
        this.loader = new TextureLoader();
        this.material = textures.map(url => new MeshStandardMaterial({ map: this.loader.load(url) }));
        this.mesh = new Mesh(this.geometry, this.material);
        this.debug = document.getElementById('debug');
        this.lines = [
            new Segment([size * -2,0,0], [size * 2,0,0], 'red', this.mesh),
            new Segment([0,size * -2,0], [0,size * 2,0], 'green', this.mesh),
            new Segment([0,0,size * -2], [0,0,size * 2], 'blue', this.mesh),
        ];

        this.axisX = 0;
        this.axisY = 1;
        this.axisZ = 2;

        this.position = [0, 0];
        this.rotation = [0, 0, 0];

        this.duration = 200;

        this.currentPosition = [
            new EasedValue(0, 1 * 1000 / this.duration),
            new EasedValue(0, 1 * 1000 / this.duration),
        ];

        this.currentRotation = [
            new EasedValue(0, Math.PI / 2 * 1000 / this.duration),
            new EasedValue(0, Math.PI / 2 * 1000 / this.duration),
            new EasedValue(0, Math.PI / 2 * 1000 / this.duration),
        ];
    }

    moveX(value) {
        this.move(0, value);
        this.rotate(this.axisY, value);

        const { axisZ } = this;
        this.axisZ = this.axisX;
        this.axisX = axisZ;

    }

    moveY(value) {
        this.move(1, value);
        this.rotate(this.axisX, -value);

        const { axisZ } = this;
        this.axisZ = this.axisY;
        this.axisY = axisZ;
    }

    move(i, value) {
        this.position[i] += value;
        this.currentPosition[i].set(this.position[i]);
    }

    rotate(i, value) {
        console.log('rotate', i, value);
        const sum = this.rotation.reduce((total, value, index) => {
            if (index === i) {
                return total;
            }

            if (index === 2) {
                return total + value + 1;
            }

            /*if (i === 1) {
                return total + value + 2;
            }*/

            return total + value;
        }, 0);
        console.log(sum);

        const sign = Math.floor(sum / 2) % 2 === 0 ? 1 : -1;

        this.rotation[i] += sign * value;
        this.currentRotation[i].set(this.rotation[i] * Math.PI / 2);
    }

    update(time) {
        this.mesh.position.x = this.currentPosition[0].update(time);
        this.mesh.position.y = this.currentPosition[1].update(time);

        this.mesh.rotateX(this.currentRotation[0].updateDiff(time));
        this.mesh.rotateY(this.currentRotation[1].updateDiff(time));
        this.mesh.rotateZ(this.currentRotation[2].updateDiff(time));

        this.debug.innerText = this.getDebug();
    }

    getDebug() {
        const axes = ['x (1-2)', 'y (3-4)', 'z (5-6)'];

        return [
            `[Position] x: ${this.position[0]} y: ${this.position[1]}.`,
            `[Rotation] ${this.rotation[0]}, ${this.rotation[1]}, ${this.rotation[2]}.`,
            `[Angles] ${this.mesh.rotation.x}, ${this.mesh.rotation.y}, ${this.mesh.rotation.z}.`,
            `[Axes] worldX: ${axes[this.axisX]}, worldY: ${axes[this.axisY]}, worldZ: ${axes[this.axisZ]}.`,
        ].join('\n');
    }
}
