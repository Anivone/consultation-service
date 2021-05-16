import { IRating } from "./types";

export class Rating {
    _id?: string;
    one?: number;
    two?: number;
    three?: number;
    four?: number;
    five?: number;

    constructor({_id, one, two, three, four, five,}: IRating) {
        this._id = _id;
        this.one = one;
        this.two = two;
        this.three = three;
        this.four = four;
        this.five = five;
    }
}