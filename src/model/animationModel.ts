export class Animation {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    spriteSheet: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    currentFrame: number = 0;
    totalFrames: number = 4; // Assuming you have 4 frames
    animationInterval: NodeJS.Timeout;

      constructor(elementLink: string, element: HTMLCanvasElement, height: number, width: number) {
        this.canvas = element;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.spriteSheet = new Image();
        this.spriteSheet.src = elementLink;
        this.frameWidth = width;
        this.frameHeight = height;
        this.spriteSheet.onload = () => {
            this.animationInterval = setInterval(() => this.animate(), 100);
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.spriteSheet,
            this.currentFrame * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            0,
            0,
            this.frameWidth,
            this.frameHeight
        );
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    }
}