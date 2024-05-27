import { Player } from "../model/playerModel";
import {MovementController} from "./movementController";
import {LifeController} from "./lifeController";
import {Projectile} from "../model/projectileModel";
import {Game} from "../model/gameModel";

export class PlayerController{
    game: Game;
    playerInterval: NodeJS.Timeout;
    constructor(game: Game){
        this.game = game;
    }
    runPlayer(player: Player){
        let movement = new MovementController(player, this.game);
        movement.movePlayer();

        this.playerInterval = setInterval(() => {
            let playerTop = parseInt(player.canvas.style.top, 10);
            let playerLeft = parseInt(player.canvas.style.left, 10);
            let projectile = new Projectile(playerTop, playerLeft);
            movement.moveProjectile(projectile, player.direction);
        }, 500);

    }
}