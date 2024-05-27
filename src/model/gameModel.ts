import {Player} from "./playerModel";

export class Game {
    timer: number;
    score: number;
    player: Player;

    constructor(player: Player) {
        this.timer = 0;
        this.score = 0;
        this.player = player;
    }
}