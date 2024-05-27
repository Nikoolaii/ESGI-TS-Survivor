import {Player} from "../model/playerModel";

export class LifeController{
    lifeImg: string = './src/resources/heart.webp';
    player: Player;
    lifeContainer: HTMLElement = document.getElementById('life-container');

    constructor(player: Player){
        this.player = player;
        this.renderLife();
    }

    renderLife(){
        this.lifeContainer.innerHTML = '';
        for(let i = 0; i < this.player.life; i++){
            let img = document.createElement('img');
            img.src = this.lifeImg;
            img.className = 'life';
            this.lifeContainer.appendChild(img);
        }
    }

    updateLife(){
        this.renderLife();
    }


}