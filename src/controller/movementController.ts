import {Projectile} from "../model/projectileModel";
import {Player} from "../model/playerModel";
import {Game} from "../model/gameModel";

export class MovementController {

  key:Array<String> = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'z', 'q', 's', 'd'];
  element: Player;
  speed: number ; // You can adjust this value to control the speed of the movement
  game: Game;

  constructor(element: Player, game: Game) {
    this.element = element;
    this.speed = element.speed;
    this.game = game;
  }

  movePlayer() {
    let direction = null;

    const move = () => {
      if (direction === 'ArrowUp' || direction === 'z') {
        if (parseInt(this.element.canvas.style.top, 10) <= 0) {
          this.element.canvas.style.top = '0px';
        } else {
          this.element.canvas.style.top = `${parseInt(this.element.canvas.style.top, 10) - this.speed}px`;
          this.element.direction = direction;
        }
      } else if (direction === 'ArrowDown' || direction === 's') {
        if (parseInt(this.element.canvas.style.top, 10) >= window.innerHeight - this.element.canvas.height) {
          this.element.canvas.style.top = `${window.innerHeight - this.element.canvas.height}px`;
        } else {
          this.element.canvas.style.top = `${parseInt(this.element.canvas.style.top, 10) + this.speed}px`;
          this.element.direction = direction;
        }
      } else if (direction === 'ArrowLeft' || direction === 'q') {
        if (parseInt(this.element.canvas.style.left, 10) <= 0) {
          this.element.canvas.style.left = '0px';
        } else {
          this.element.canvas.style.left = `${parseInt(this.element.canvas.style.left, 10) - this.speed}px`;
          this.element.canvas.style.transform = 'scaleX(-1)';
          this.element.direction = direction;
        }
      } else if (direction === 'ArrowRight' || direction === 'd') {

        if (parseInt(this.element.canvas.style.left, 10) >= window.innerWidth - this.element.canvas.width) {
          this.element.canvas.style.left = `${window.innerWidth - this.element.canvas.width}px`;
        } else {
          this.element.canvas.style.left = `${parseInt(this.element.canvas.style.left, 10) + this.speed}px`;
          this.element.canvas.style.transform = 'scaleX(1)';
          this.element.direction = direction;
        }
      }

      requestAnimationFrame(move);
    }

    addEventListener('keydown', (event) => {
      console.log(event.key)
      if (this.key.includes(event.key)) {
        direction = event.key;
      }
    })

    addEventListener('keyup', (event) => {
      if (this.key.includes(event.key)) {
        direction = null;
      }
    })

    move();
  }

  moveProjectile(projectile: Projectile, direction: string) {
    const move = () => {
        setTimeout(() => {
            this.detectEnemyCollision(projectile);
        }, 200);
      if (direction === 'ArrowUp' || direction === 'z') {
        if (parseInt(projectile.canvas.style.top, 10) <= 0) {
          projectile.canvas.remove();
          projectile = null;
          return;
        }
        projectile.canvas.style.top = `${parseInt(projectile.canvas.style.top, 10) - projectile.speed}px`;
      } else if (direction === 'ArrowDown' || direction === 's') {
        if (parseInt(projectile.canvas.style.top, 10) >= window.innerHeight - projectile.canvas.height - 60) {
          projectile.canvas.remove();
          projectile = null;
          return;
        }
        projectile.canvas.style.rotate = '180deg';
        projectile.canvas.style.top = `${parseInt(projectile.canvas.style.top, 10) + projectile.speed}px`;
      } else if (direction === 'ArrowLeft' || direction === 'q') {
        if (parseInt(projectile.canvas.style.left, 10) <= 0) {
          projectile.canvas.remove();
          projectile = null;
          return;
        }
        projectile.canvas.style.rotate = '-90deg';
        projectile.canvas.style.left = `${parseInt(projectile.canvas.style.left, 10) - projectile.speed}px`;
      } else if (direction === 'ArrowRight' || direction === 'd') {
        if (parseInt(projectile.canvas.style.left, 10) >= window.innerWidth - projectile.canvas.getBoundingClientRect().width) {
          projectile.canvas.remove();
          projectile = null;
          return;
        }
        projectile.canvas.style.rotate = '90deg';
        projectile.canvas.style.left = `${parseInt(projectile.canvas.style.left, 10) + projectile.speed}px`;
      }

      requestAnimationFrame(move);
    }

  move();}


  detectEnemyCollision(projectile: Projectile) {

    if (!projectile) {
      return;
    }

    if (!document.body.contains(projectile.canvas)) {
      return;
    }


    let enemies = document.getElementsByClassName('enemy') as HTMLCollectionOf<HTMLElement>;
    let enemiesArray = Array.from(enemies);
    let projectileTop = parseInt(projectile.canvas.style.top, 10);
    let projectileLeft = parseInt(projectile.canvas.style.left, 10);
    let projectileWidth = projectile.canvas.width;
    let projectileHeight = projectile.canvas.height;

    for (let i = 0; i < enemiesArray.length; i++) {
      let enemy = enemiesArray[i];
      let enemyTop = parseInt(enemy.style.top, 10);
      let enemyLeft = parseInt(enemy.style.left, 10);
      let enemyWidth = enemy.getBoundingClientRect().width;
      let enemyHeight = enemy.getBoundingClientRect().height;

      if (projectileTop < enemyTop + enemyHeight &&
          projectileTop + projectileHeight > enemyTop &&
          projectileLeft < enemyLeft + enemyWidth &&
          projectileLeft + projectileWidth > enemyLeft) {
        this.game.score += 1;
        if(document.body.contains(enemy)){
          document.body.removeChild(enemy);
          enemy = null;
        }
        if(document.body.contains(projectile.canvas)){
          document.body.removeChild(projectile.canvas);
          projectile = null;
        }
        break;
      }
    }
  }
}