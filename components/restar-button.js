export class RestartButton{
    constructor(scene){//recibimos la escena donde lo llamamos
        this.relatedScene = scene;
    }

    preload(){
        this.relatedScene.load.spritesheet('button','images/restart.png', {frameWidth: 190, frameHeight: 49});//usamos this.relatedScene para precargar algo en la escena, ya que la propiedad "relatedScene" es donde había guardado la escena relacionada con esta instancia del componente.
    }

    create(){
        this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();
        /*
        Un sprite se añade de manera similar a una imagen y, de entrada, mostrará la primera imagen disponible del sprite. Luego las podemos cambiar.

        El método setInteractive() simplemente sirve para que podamos hacer el botón interactivo, con lo que responderá a diversos eventos del usuario. 
        */
        this.startButton.on('pointerover', ()=>{
            this.startButton.setFrame(1);
        });

        this.startButton.on('pointerout', ()=>{
            this.startButton.setFrame(0);
        });

        this.startButton.on('pointerdown', ()=>{
            this.relatedScene.scene.start('game');
        });
    }
}