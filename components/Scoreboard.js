export class Scoreboard{
    constructor(scene, x, y, name){
        this.relatedScene = scene;
        this.score = 0;
        this.x = x;
        this.y = y;
        this.name = name;
    }

    create(){
        this.scoreText= this.relatedScene.add.text(this.x, this.y, this.name + ': 0',{
            fontSize: '30px',
            fill: '#fbf',
            fontFamily: 'verdana, aria, sans-serif'
        });
    }

    incrementPoints(points){
        this.score += points;
        this.scoreText.setText(this.name + ': ' + this.score);
    }
}