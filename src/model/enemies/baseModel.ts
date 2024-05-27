import {Animation} from "../animationModel";

export class BaseEnemy {
    health: number;
    sprite: string;
    animation: Animation;
    canvas: HTMLCanvasElement;

    constructor() {
        this.health = 1;
        this.sprite = './src/resources/sprite/enemies/enemy1.png';
        this.canvas = <HTMLCanvasElement>document.createElement('canvas');

        this.canvas.width = 32;
        this.canvas.height = 32;

        this.canvas.className = 'enemy';
        this.canvas.id = 'enemy';

        this.canvas.style.position = 'absolute';

        this.randomPosition();

        this.canvas.style.width = '64px';
        this.canvas.style.height = '64px';


        this.animation = new Animation(this.sprite, this.canvas, 32, 32);
    }

    takeDamage(damage: number) {
        this.health -= damage;
    }

    getHealth() {
        return this.health;
    }

    randomPosition() {
        let random = Math.floor(Math.random() * 4);
        if (random === 0) {
            this.canvas.style.top = '0px';
            this.canvas.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
        } else if (random === 1) {
            this.canvas.style.top = `${window.innerHeight - this.canvas.height}px`;
            this.canvas.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
        } else if (random === 2) {
            this.canvas.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
            this.canvas.style.left = '0px';
        } else {
            this.canvas.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
            this.canvas.style.left = `${window.innerWidth - this.canvas.width}px`;
        }
    }
}