import { Game } from "./scenes/game.js";
import { Gameover } from "./scenes/gameover.js";
import { Congratulations } from "./scenes/congratulations.js";

const Config = {
    type: Phaser.Auto,
    width: 800,
    heihgt: 500,
    scene: [Game, Gameover, Congratulations],
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 300},
            debug: false
        }
    }
}

var game = new Phaser.Game(Config);