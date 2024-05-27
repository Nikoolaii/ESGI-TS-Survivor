import { Animation } from "./animationModel";
import { Projectile} from "./projectileModel";

export class Player {
    sprite: string;
    animation: Animation;
    speed: number = 2.5;
    life: number = 3;
    canvas: HTMLCanvasElement;
    direction: string = 'ArrowRight';

    constructor( sprite: string) {
        this.sprite = sprite;
        this.canvas = <HTMLCanvasElement>document.createElement('canvas');

        this.canvas.width = 32;
        this.canvas.height = 32;

        this.canvas.className = 'player';
        this.canvas.id = 'player';

        this.canvas.style.position = 'absolute';
        this.canvas.style.top = `${window.innerHeight / 2 - this.canvas.height / 2}px`;
        this.canvas.style.left = `${window.innerWidth / 2 - this.canvas.width / 2}px`;
        this.canvas.style.width = '64px';
        this.canvas.style.height = '64px';

        this.animation = new Animation(sprite, this.canvas, 32, 32);
    }
}