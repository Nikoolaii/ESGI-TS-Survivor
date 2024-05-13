export class MovementController {

  key:Array<String> = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  element: HTMLCanvasElement;
  speed: number = 5; // You can adjust this value to control the speed of the movement

  constructor(element: HTMLCanvasElement) {
    this.element = element;
  }

  movePlayer() {
    let direction = null;

    const move = () => {
      if (direction === 'ArrowUp') {
        this.element.style.top = `${parseInt(this.element.style.top, 10) - this.speed}px`;
      } else if (direction === 'ArrowDown') {
        this.element.style.top = `${parseInt(this.element.style.top, 10) + this.speed}px`;
      } else if (direction === 'ArrowLeft') {
        this.element.style.left = `${parseInt(this.element.style.left, 10) - this.speed}px`;
        this.element.style.transform = 'scaleX(-1)';
      } else if (direction === 'ArrowRight') {
        this.element.style.left = `${parseInt(this.element.style.left, 10) + this.speed}px`;
        this.element.style.transform = 'scaleX(1)';
      }

      requestAnimationFrame(move);
    }

    addEventListener('keydown', (event) => {
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
}