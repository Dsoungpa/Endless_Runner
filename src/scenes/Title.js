class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/audio/sound.mp3');
        this.load.image('sky', './assets/img/Sky.png');
        this.load.image('clouds', './assets/img/Clouds.png');
        this.load.image('mountains', './assets/img/Mountains.png');
        this.load.image('trees1', './assets/img/Trees1.png');
        this.load.image('trees2', './assets/img/Trees2.png');
        this.load.image('bar', './assets/img/HealthBar.png');
    }

    create() {

        this.sky = this.add.tileSprite(0, 0, 960, 640, 'sky').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 960, 640, 'clouds').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, 0, 960, 640, 'mountains').setOrigin(0, 0);
        this.trees1 = this.add.tileSprite(0, 0, 960, 640, 'trees1').setOrigin(0, 0);
        this.trees2 = this.add.tileSprite(0, 0, 960, 640, 'trees2').setOrigin(0, 0);

        //this.add.image(0, 0, 'bar').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        //borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert',
        //menuConfig).setOrigin(0.5);
        //this.mainback = this.add.tileSprite(0, 0, 640, 480, 'mainback').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene'); 
        }

      }
    }
