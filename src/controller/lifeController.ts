export class LifeController{
    lifeImg: string = './src/resources/heart.webp';
    life: number;
    lifeContainer: HTMLElement = document.getElementById('life-container');

    constructor(life: number){
        this.life = life;
        this.renderLife();
    }

    renderLife(){
        this.lifeContainer.innerHTML = '';
        for(let i = 0; i < this.life; i++){
            let img = document.createElement('img');
            img.src = this.lifeImg;
            img.className = 'life';
            this.lifeContainer.appendChild(img);
        }
    }


}