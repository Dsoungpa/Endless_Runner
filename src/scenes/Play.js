class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    preload(){
        this.load.image('dragon', './assets/img/Dragon.png');
    }

    create(){
        this.p1 = new Dragon(this, 100, game.config.height - borderUISize - borderPadding - 30, 'dragon', false).setOrigin(0.5, 0);
    }

    update(){
        this.p1.update();
    }


}