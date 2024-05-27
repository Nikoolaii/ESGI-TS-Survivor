import {Game} from "../model/gameModel";
import {BaseEnemy} from "../model/enemies/baseModel";

export class EnemyController {
    nbEnemies: number;
    Game: Game;

    constructor(game : Game) {
        this.Game = game;
    }
    invokeEnemies() {
        let enemy = new BaseEnemy();
        document.body.appendChild(enemy.canvas);
        this.runToPlayer(enemy);
    }

    runToPlayer(enemy: BaseEnemy) {
        let player = document.getElementById('player');
        let playerTop = parseInt(player.style.top, 10);
        let playerLeft = parseInt(player.style.left, 10);

        let enemyTop = parseInt(enemy.canvas.style.top, 10);
        let enemyLeft = parseInt(enemy.canvas.style.left, 10);

        let distanceTop = playerTop - enemyTop;
        let distanceLeft = playerLeft - enemyLeft;

        let distance = Math.sqrt(Math.pow(distanceTop, 2) + Math.pow(distanceLeft, 2));

        setInterval(() => {
            enemyTop = parseInt(enemy.canvas.style.top, 10);
            enemyLeft = parseInt(enemy.canvas.style.left, 10);

            distanceTop = playerTop - enemyTop;
            distanceLeft = playerLeft - enemyLeft;

            distance = Math.sqrt(Math.pow(distanceTop, 2) + Math.pow(distanceLeft, 2));

            let speed = 5;

            let top = enemyTop + (distanceTop / distance) * speed;
            let left = enemyLeft + (distanceLeft / distance) * speed;

            enemy.canvas.style.top = `${top}px`;
            enemy.canvas.style.left = `${left}px`;
        } , 1000);
    }
}