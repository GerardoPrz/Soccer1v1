import { RestartButton } from "../components/restar-button.js";

export class Congratulations extends Phaser.Scene{
    constructor(){
        super({ key: 'congratulations'});
        this.restarButton = new RestartButton(this);
    }

    preload(){
        this.load.image('congratulations', 'images/congratulations.png');
        this.restarButton.preload();

    }

    create(){
        this.add.image(410, 250, 'background');
        this.restarButton.create();
        this.congratulationsImage = this.add.image(400, 300, 'congratulations');
    }
}