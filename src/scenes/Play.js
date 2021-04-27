class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    preload(){
        // load player
        this.load.image('dragon', './assets/img/Dragon.png');
        // load food
        this.load.image('food', './assets/img/DaBabyCar2.png');
    }

    create(){
        // adds Dragon to the Game
        this.p1 = new Dragon(this, 100, game.config.height - borderUISize - borderPadding - 30, 'dragon', false).setOrigin(0.5, 0);

        // adds Food to the Game
        // initial random food
        var random = Phaser.Math.Between(1, 600);
        this.food1 = new Food(this, 100, random, 'food', false).setOrigin(0.5, 0);
    }

    update(){
        this.p1.update();
        this.food1.update();
    }


}