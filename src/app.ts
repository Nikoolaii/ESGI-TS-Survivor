import '../scss/style.scss';

import {Player} from "./model/playerModel";
import {MovementController} from "./controller/movementController";
import {LifeController} from "./controller/lifeController";

// Init player and his movement
let player = new Player(3, 0, 1, './src/resources/sprite/caractere.png');
let movement = new MovementController(player.canvas);
movement.movePlayer();
// Init the life of the player
let lifeController = new LifeController(player.life);
