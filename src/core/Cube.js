import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
} from 'three';
import EasedValue from './EasedValue';
import { textures } from '../../assets/image/cube';

export default class Cube {
    constructor(size = 1) {
        this.geometry = new BoxGeometry(size, size, size);
        this.loader = new TextureLoader();
        this.material = textures.map(url => new MeshStandardMaterial({ map: this.loader.load(url) }));
        this.mesh = new Mesh(this.geometry, this.material);

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
        //const axis = this.rotation[0] % 2 === 0 ? 1 : 2;
        //const sign = Math.floor(Math.abs(this.rotation[0]) / 2) % 2 === 0 ? 1 : -1;
        this.move(0, value);
        this.rotate(this.axisY, value);


        const { axisZ } = this;
        this.axisZ = this.axisX;
        this.axisX = axisZ;

        console.log('moveX', this.position, this.rotation, [this.axisX, this.axisY, this.axisZ]);
        //+Y
        //this.axisY += value;

    }

    moveY(value) {
        this.move(1, value);
        this.rotate(this.axisX, -value);

        const { axisZ } = this;
        this.axisZ = this.axisY;
        this.axisY = axisZ;

        console.log('moveY', this.position, this.rotation, [this.axisX, this.axisY, this.axisZ]);
    }

    move(i, value) {
        this.position[i] += value;
        this.currentPosition[i].set(this.position[i]);
    }

    rotate(i, value) {
        console.log('rotate', i, value);
        this.rotation[i] += value;
        this.currentRotation[i].set(this.rotation[i] * Math.PI / 2);
    }

    update(time) {
        this.mesh.position.x = this.currentPosition[0].update(time);
        this.mesh.position.y = this.currentPosition[1].update(time);

        this.mesh.rotation.x = this.currentRotation[0].update(time);
        this.mesh.rotation.y = this.currentRotation[1].update(time);
        this.mesh.rotation.z = this.currentRotation[2].update(time);
    }
}
