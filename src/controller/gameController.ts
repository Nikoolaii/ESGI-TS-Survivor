import {PlayerController} from "./playerController";
import {Game} from "../model/gameModel";
import {Player} from "../model/playerModel";
import {EnemyController} from "./enemyController";
import {LifeController} from "./lifeController";

export class GameController {
    playerController: PlayerController;
    enemyController: EnemyController;
    game: Game;
    player: Player;
    lifeController: LifeController;

    mobInterval: NodeJS.Timeout;
    timerInterval: NodeJS.Timeout;
    scoreInterval: NodeJS.Timeout;
    constructor() {
    }
    runGame() {
        this.player = new Player('./src/resources/sprite/character.png');
        this.game = new Game(this.player);
        this.playerController = new PlayerController(this.game);
        this.enemyController = new EnemyController(this.game);
        this.lifeController = new LifeController(this.player);

        let statContainer = document.getElementById('stats-container');
        statContainer.style.display = 'block';

        let startContainer = document.getElementById('startGame');
        startContainer.style.display = 'none';

        this.playerController.runPlayer(this.player);

        this.timerInterval = setInterval(() => {
            this.game.timer++;
            this.updateTime();
        }, 1000);

        this.scoreInterval = setInterval(() => {
            if (this.player.life <= 0) {
                this.gameOver();
            }
            this.updateScore();
            this.lifeController.updateLife();
        }, 100);

        this.mobInterval = setInterval(() => {
            this.enemyController.invokeEnemies();
        }, 1000);
    }

    updateTime() {
        let timer = document.getElementById('timer');
        let finalTime = document.getElementById('finalTime');

        let minutes = Math.floor(this.game.timer / 60);
        let seconds = this.game.timer % 60;

        timer.innerHTML = `${minutes}:${seconds}`;
        finalTime.innerHTML = `${minutes}:${seconds}`;
    }

    updateScore() {
        let score = document.getElementById('score');
        score.innerHTML = `${this.game.score}`;
    }


    gameOver() {
        let gameOver = document.getElementById('endGame');
        let score = document.getElementById('finalScore');
        let scoreBoard = document.getElementById('stats-container');
        let restart = document.getElementById('restartButton');

        if (gameOver && score && scoreBoard && restart) {
            scoreBoard.style.display = 'none';

            let projectiles = document.getElementsByClassName('projectile') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < projectiles.length; i++) {
                projectiles[i].style.display = 'none';
            }

            let player = document.getElementById('player');
            if (player) {
                player.style.display = 'none';
            }

            let enemies = document.getElementsByClassName('enemy') as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].style.display = 'none';
            }
            clearInterval(this.mobInterval);
            clearInterval(this.enemyController.enemyInterval);
            clearInterval(this.timerInterval);
            clearInterval(this.scoreInterval);
            clearInterval(this.playerController.playerInterval);

            gameOver.style.display = 'block';
            score.innerHTML = `${this.game.score}`;

            restart.addEventListener('click', () => {
                window.location.reload();
            });
        } else {
            console.error('One or more elements could not be found.');
        }
    }

}