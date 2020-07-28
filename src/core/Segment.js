import {
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Vector3,
} from 'three';

export default class Segment {
    constructor(start, end, color, parent) {
        this.mesh = new Line(
            new BufferGeometry().setFromPoints([
                new Vector3(...start),
                new Vector3(...end),
            ]),
            new LineBasicMaterial({ color })
        );

        parent.add(this.mesh);
    }
}
