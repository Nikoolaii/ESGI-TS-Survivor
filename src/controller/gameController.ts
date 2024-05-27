import {PlayerController} from "./playerController";
import {Game} from "../model/gameModel";
import {Player} from "../model/playerModel";
import {EnemyController} from "./enemyController";

export class GameController {
    playerController: PlayerController;
    enemyController: EnemyController;
    game: Game;
    player: Player;
    constructor() {
        this.game = new Game();
        this.playerController = new PlayerController(this.game);
        this.player = new Player(0, 1, './src/resources/sprite/character.png');
        this.enemyController = new EnemyController(this.game);
    }
    runGame() {
        this.playerController.runPlayer(this.player);

        setInterval(() => {
            this.game.timer++;
            this.updateTime();
        }, 1000);

        setInterval(() => {
            this.updateScore();
        }, 500);

        setInterval(() => {
            this.enemyController.invokeEnemies();
        }, 2000);
    }

    updateTime() {
        let timer = document.getElementById('timer');

        let minutes = Math.floor(this.game.timer / 60);
        let seconds = this.game.timer % 60;

        timer.innerHTML = `${minutes}:${seconds}`;
    }

    updateScore() {
        let score = document.getElementById('score');
        score.innerHTML = `${this.game.score}`;
    }
}