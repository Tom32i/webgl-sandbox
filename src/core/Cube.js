import { BoxGeometry, MeshPhongMaterial, Mesh } from 'three';

export default class Cube {
    constructor(color = 0x00ff00) {
        this.geometry = new BoxGeometry();
        this.material = new MeshPhongMaterial({ color });
        this.mesh = new Mesh(this.geometry, this.material);
    }
}
