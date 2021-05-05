class HowToPlay extends Phaser.Scene {
    constructor() {
        super('howtoplayScene');
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/audio/sound.mp3');
        this.load.image('sky', './assets/img/Sky.png');
        this.load.image('how', './assets/img/HowToPlay.png');
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 960, 640, 'how').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start('titleScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene'); 
          }
    }
}