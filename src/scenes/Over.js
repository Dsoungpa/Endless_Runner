class Over extends Phaser.Scene {
    constructor() {
        super('overScene');
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/audio/sound.mp3');
        this.load.image('sky', './assets/img/Sky.png');
        this.load.image('over', './assets/img/Over.png');
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 960, 640, 'over').setOrigin(0, 0);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_select');
            this.scene.start('titleScene'); 
          }
    }
}