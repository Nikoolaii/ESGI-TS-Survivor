import { Animation } from "./animationModel";

export class Player {
    life: number;
    experience: number;
    level: number;
    sprite: string;
    animation: Animation;
    expArray: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    speed: number = 5;
    canvas: HTMLCanvasElement;

    constructor(life: number, experience: number, level: number, sprite: string) {
        this.life = life;
        this.experience = experience;
        this.level = level;
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

        this.animation = new Animation(sprite, this.canvas);
    }

    levelUp() {
        this.level++;
        this.experience = 0;
    }

    gainExperience(exp: number) {
        this.experience += exp;
        if (this.experience >= this.expArray[this.level]) {
            this.levelUp();
        }
    }
}