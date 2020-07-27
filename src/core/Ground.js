import {
    PlaneGeometry,
    MeshBasicMaterial,
    DoubleSide,
    Mesh,
} from 'three';

export default class Ground {
    constructor(size = 10) {
        this.mesh = new Mesh(
            new PlaneGeometry(size, size),
            new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide })
        );
    }
}
