import '../scss/style.scss';

import { GameController }  from "./controller/gameController";



let startBtn = document.getElementById('startButton');
let gameController = new GameController();
startBtn.addEventListener('click', () => {
    gameController.runGame();
    startBtn.style.display = 'none';
});