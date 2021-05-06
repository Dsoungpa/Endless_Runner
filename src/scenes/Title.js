class Title extends Phaser.Scene {
  constructor() {
      super('titleScene');
  }

  preload(){
      // load audio
      this.load.audio('sfx_select', './assets/audio/sound.mp3');
      this.load.image('sky', './assets/img/Sky.png');
      this.load.image('mainmenu', './assets/img/MainMenu.png');
      

      this.load.atlas("dragon2", "./assets/img/Dragon2.png", "./assets/img/Dragon2.json");

  }

  create() {

      this.sky = this.add.tileSprite(0, 0, 960, 640, 'mainmenu').setOrigin(0, 0);
      this.dragon2 = this.add.sprite(111, 100, "dragon2");

      var frameNames = this.textures.get('dragon2').getFrameNames();
      //console.log(frameNames);

      this.anims.create({
        key: 'fly',
        frames: [{
          key: "dragon2",
          frame: "Dragon 0.aseprite"
        }, {
          key: "dragon2",
          frame: "Dragon 1.aseprite"
        }, {
          key: "dragon2",
          frame: "Dragon 2.aseprite"
        }, {
          key: "dragon2",
          frame: "Dragon 3.aseprite"
        }, {
          key: "dragon2",
          frame: "Dragon 4.aseprite"
        }, {
          key: "dragon2",
          frame: "Dragon 5.aseprite"
        }],
        frameRate: 14,
        repeat: -1
      });
      this.dragon2.play("fly");

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
        this.sound.play('sfx_select');
        this.scene.start('howtoplayScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        this.sound.play('sfx_select');
        this.scene.start('playScene'); 
      }

    }
  }
