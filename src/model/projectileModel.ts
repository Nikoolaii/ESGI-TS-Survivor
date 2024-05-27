export class Projectile {
    speed: number = 5;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    spriteSheet: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;

    constructor(x: number, y:number) {

        this.canvas = <HTMLCanvasElement>document.createElement('canvas');
        this.canvas.width = 64;
        this.canvas.height = 64;

        this.canvas.className = 'projectile';
        this.canvas.id = 'projectile';

        this.canvas.style.position = 'absolute';
        this.canvas.style.top = `${x}px`;
        this.canvas.style.left = `${y}px`;


        this.ctx = this.canvas.getContext('2d');
        this.spriteSheet = new Image();
        this.spriteSheet.src = './src/resources/projectile.png';

        this.frameWidth = 64;
        this.frameHeight = 64;

        this.spriteSheet.onload = () => {
            this.ctx.drawImage(this.spriteSheet, 0, 0, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
        }

        document.body.appendChild(this.canvas);
    }
}