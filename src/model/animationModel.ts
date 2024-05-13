export class Animation {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    spriteSheet: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    currentFrame: number = 0;
    totalFrames: number = 4; // Assuming you have 4 frames
    animationInterval: NodeJS.Timeout;

    constructor(elementLink: string, element: HTMLCanvasElement) {
        this.canvas = element;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.spriteSheet = new Image();
        this.spriteSheet.src = elementLink; // Path to your sprite sheet
        this.frameWidth = 32; // Width of each frame in the sprite sheet
        this.frameHeight = 32; // Height of each frame in the sprite sheet
        this.spriteSheet.onload = () => {
            this.animationInterval = setInterval(() => this.animate(), 100); // Start animation loop
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.spriteSheet,
            this.currentFrame * this.frameWidth, // Source x
            0, // Source y (assuming all frames are on the same row)
            this.frameWidth, // Source width
            this.frameHeight, // Source height
            0, // Destination x
            0, // Destination y
            this.frameWidth, // Destination width
            this.frameHeight // Destination height
        );
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    }
}