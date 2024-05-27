import {Game} from "../model/gameModel";
import {BaseEnemy} from "../model/enemies/baseModel";

export class EnemyController {
    nbEnemies: number;
    game: Game;
    enemyInterval: NodeJS.Timeout;

    constructor(game : Game) {
        this.game = game;
    }
    invokeEnemies() {
        let enemy = new BaseEnemy();
        document.body.appendChild(enemy.canvas);
        this.runToPlayer(enemy);
    }

    runToPlayer(enemy: BaseEnemy) {
        this.enemyInterval = setInterval(() => {
            let player = document.getElementById('player');
            if (!player || this.game.player.life <= 0) {
                clearInterval(this.enemyInterval);
                return;
            }
            let playerTop = parseInt(player.style.top, 10);
            let playerLeft = parseInt(player.style.left, 10);

            let enemyTop = parseInt(enemy.canvas.style.top, 10);
            let enemyLeft = parseInt(enemy.canvas.style.left, 10);

            let distanceTop = playerTop - enemyTop;
            let distanceLeft = playerLeft - enemyLeft;

            let distance = Math.sqrt(Math.pow(distanceTop, 2) + Math.pow(distanceLeft, 2));

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

            this.detectPlayerCollision();
        } , 100);
    }

    detectPlayerCollision() {
        let player = document.getElementById('player');
        let enemies = document.getElementsByClassName('enemy') as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            let playerTop = parseInt(player.style.top, 10);
            let playerLeft = parseInt(player.style.left, 10);

            let enemyTop = parseInt(enemy.style.top, 10);
            let enemyLeft = parseInt(enemy.style.left, 10);

            if (playerTop < enemyTop + 64 &&
                playerTop + 64 > enemyTop &&
                playerLeft < enemyLeft + 64 &&
                playerLeft + 64 > enemyLeft) {
                this.game.player.life -= 1;
                enemy.remove();
            }
        }
    }
}