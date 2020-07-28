export default class EasedValue {
    constructor(value, speed) {
        this.value = value;
        this.target = value;
        this.speed = speed;
        console.log(this);
    }

    set(target) {
        this.target = target;
    }

    update(time) {
        if (this.target === this.value) {
            return this.value;
        }

        const forward = this.target > this.value;
        const direction = forward ? 1 : -1;
        const cap = forward ? Math.min : Math.max;

        this.value = cap(this.value + direction * time / 1000 * this.speed, this.target);

        return this.value;
    }

    updateDiff(time) {
        if (this.target === this.value) {
            return 0;
        }

        const forward = this.target > this.value;
        const direction = forward ? 1 : -1;
        const cap = forward ? Math.min : Math.max;
        const { value } = this;

        this.value = cap(this.value + direction * time / 1000 * this.speed, this.target);

        return this.value - value;
    }
}
