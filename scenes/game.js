import { Scoreboard } from "../components/Scoreboard.js";
import { RestartButton } from '../components/restar-button.js';

export class Game extends Phaser.Scene{
    constructor(){
        super({ key: 'game' });
    }

    init(){
        this.scoreboardPlayer1 = new Scoreboard(this, 16, 200, "Local");
        this.scoreboardPlayer2 = new Scoreboard(this, 600, 200, "Visitante");
        this.restarbutton = new RestartButton(this);
    }

    preload(){
        this.load.image('gameover','images/gameover.png');
        this.load.image('ground','images/platform.png');
        this.load.image('tribune','images/gradas.png');
        this.load.image('background', 'images/backgroundSky.png');
        this.load.image('diamond', 'images/diamond.png');
        this.load.image('ball', 'images/pelota.png');
        this.load.image('goal', 'images/goal.png');
        this.load.image('goalimage', 'images/goalimage');
        this.load.spritesheet('player', 'images/woofPlayer.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        this.physics.world.setBoundsCollision(true, true, true, true);//activamos las "paredes del escenario"

        this.add.image(400,300, 'background');

        this.add.image(400,600, 'tribune');
        
        this.gameoverImage = this.add.image(400, 300, 'gameover');//creamos un elemento pre cargado y damos las coordenadas
        this.gameoverImage.visible = false;

        this.player1 = this.physics.add.sprite(32, 150, 'player');
        this.player1.setScale(2.0);
        this.player1.body.setGravityY(300);
        this.player1.setCollideWorldBounds(true);
        this.player1.setBounce(0.2);

        this.player2 = this.physics.add.sprite(800, 150, 'player');
        this.player2.setScale(2.0);
        this.player2.setTint(400);
        this.player2.body.setGravityY(300);
        this.player2.setCollideWorldBounds(true);
        this.player2.setBounce(0.2);

        this.ball = this.physics.add.image(400, 150, 'ball');
        this.ball.setScale(4.0);
        this.ball.setCollideWorldBounds(true);//allows to bounce in walls and floor
        this.ball.setBounce(1);//decimos la magnitud del rebote que tendra el objeto
        this.ball.setData('gluePlayer1', false);
        this.ball.setData('gluePlayer2', false);


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1,
            yoyo: false,
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1,
            yoyo: false,
        });

        this.goal1 = this.physics.add.image(16,719, 'goal').setImmovable();
        this.goal1.body.allowGravity = false;
        
        this.goal2 = this.physics.add.image(795,675, 'goal').setImmovable().setOrigin(0,0).setScale(-1,1);
        this.goal2.body.allowGravity = false;

        this.scoreboardPlayer1.create();
        this.scoreboardPlayer2.create();

        this.physics.add.collider(this.ball, this.player1, this.playerImpact, null, this);//ejecutamos un metodo cuando exista una colision entre estos dos objetos
        this.physics.add.collider(this.ball, this.player2, this.playerImpact, null, this);//ejecutamos un metodo cuando exista una colision entre estos dos objetos
        this.physics.add.collider(this.player1, this.goal1);
        this.physics.add.collider(this.player1, this.goal2);
        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player2, this.goal2);
        this.physics.add.collider(this.player2, this.goal1);

        this.cursors = this.input.keyboard.createCursorKeys();
        const keyCodes= Phaser.Input.Keyboard.KeyCodes;
        this.teclaA= this.input.keyboard.addKey(keyCodes.A);
        this.teclaD= this.input.keyboard.addKey(keyCodes.D);
        this.teclaW= this.input.keyboard.addKey(keyCodes.W);
        this.teclaR= this.input.keyboard.addKey(keyCodes.R);
        this.teclaS= this.input.keyboard.addKey(keyCodes.S);
    }

    update(){
        this.player1Controls();
        this.player2Controls();
        this.checkGoal();
    }

    playerImpact(ball, player){
        if(this.cursors.space.isDown && player === this.player1){
                this.ball.setData('gluePlayer1', true);
        }

        if(this.teclaR.isDown && player === this.player2){
                this.ball.setData('gluePlayer2', true);
        }
    }

    checkGoal(){
        if(this.ball.x <= 40 && this.ball.y >= 719){
            this.scoreboardPlayer1.incrementPoints(1);
            this.setInitialState();
        } else if(this.ball.x >= 723 && this.ball.y >= 719){
            this.scoreboardPlayer2.incrementPoints(1);
            this.setInitialState();
        }

        if(this.scoreboardPlayer1.score == 5 || this.scoreboardPlayer2.score == 5){A
            this.endGame();
        }
    }

    setInitialState(){
        this.player1.x = 32;
        this.player1.y = 150;

        this.player2.x = 800;
        this.player2.y = 150;

        this.ball.x = 400;
        this.ball.y = 719;
        this.ball.setVelocityX(0);
        this.ball.setVelocityY(0);

        this.ball.setData('gluePlayer1', false);
        this.ball.setData('gluePlayer2', false);
    }

    endGame(completed = false){
        if(completed){
            this.scene.start('gameover');
        } else if(!completed){
            this.scene.start('congratulations');
        }
    }

    player1Controls(){
        if(this.cursors.left.isDown){
            this.player1.setVelocityX(-200);
            this.player1.anims.play('left', true);
            if(this.ball.getData('gluePlayer1')){
                this.ball.setVelocityX(-200);
            }
        }
        else if(this.cursors.right.isDown){
            this.player1.setVelocityX(200);
            this.player1.anims.play('right', true);
            if(this.ball.getData('gluePlayer1')){
                this.ball.setVelocityX(200);
            }
        }
        else{
            this.player1.setVelocityX(0);//modificamos solo la velocidad en X
            this.player1.anims.stop();
            if(this.ball.getData('gluePlayer1')){
                this.ball.setVelocityX(0);
            }
        }
        if (this.cursors.up.isDown && this.player1.body.onFloor()) {
            this.player1.setVelocityY(-500);
            if(this.ball.getData('gluePlayer1')){
                this.ball.setVelocityY(-500);
            }
        }

        if(this.cursors.down.isDown && this.ball.getData('gluePlayer1')){//to kick the ball{
            this.ball.setVelocityX(700);
            this.ball.setData('gluePlayer1', false);
        }
    }

    player2Controls(){
        if(this.teclaA.isDown){//left
            this.player2.setVelocityX(-200);
            this.player2.anims.play('left', true);
            if(this.ball.getData('gluePlayer2')){
                this.ball.setVelocityX(-200);
            }
        }else if(this.teclaD.isDown){//right
            this.player2.setVelocityX(200);
            this.player2.anims.play('right', true);
            if(this.ball.getData('gluePlayer2')){
                this.ball.setVelocityX(200);
            }
        }
        else{
            this.player2.setVelocityX(0);//modificamos solo la velocidad en X
            this.player2.anims.stop();
            if(this.ball.getData('gluePlayer2')){
                this.ball.setVelocityX(0);
            }
        }

        if(this.teclaW.isDown && this.player2.body.onFloor()){//up
            this.player2.setVelocityY(-500);
            if(this.ball.getData('gluePlayer2')){
                this.ball.setVelocityX(-500)
            }
        }

        if(this.teclaS.isDown && this.ball.getData('gluePlayer2')){
            this.ball.setVelocityX(-700);
            this.ball.setData('gluePlayer2', false);
        }
    }
}

