class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    

    preload(){
        // load audio
        this.load.audio('eat', './assets/audio/Eating.wav');
        this.load.audio('hurt', './assets/audio/PoisonAudio.wav');
        this.load.audio('background', './assets/audio/Dylan_8bit.wav');

        // load player
        this.load.image('dragon', './assets/img/Dragon.png');
        // load food
        this.load.image('food', './assets/img/Sheep.png');
        this.load.image('bomb', './assets/img/Bomb.png');
        this.load.image('sky', './assets/img/Sky.png');
        this.load.image('clouds', './assets/img/Clouds.png');
        this.load.image('mountains', './assets/img/Mountains.png');
        this.load.image('trees1', './assets/img/Trees1.png');
        this.load.image('trees2', './assets/img/Trees2.png');
        this.load.image('bar', './assets/img/HealthBar.png');
        this.load.image('fin', './assets/img/GameOver.png');
        //load dragon
        this.load.spritesheet('dragon2', './assets/img/DragonSprite.png', {frameWidth: 75, frameHeight: 66, startFrame: 1, endFrame: 5});
    }

    create(){

        let backgroundMusic = this.sound.add('background');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        //parallax background this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.sky = this.add.tileSprite(0, 0, 960, 640, 'sky').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 960, 640, 'clouds').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, 0, 960, 640, 'mountains').setOrigin(0, 0);
        this.trees1 = this.add.tileSprite(0, 0, 960, 640, 'trees1').setOrigin(0, 0);
        this.trees2 = this.add.tileSprite(0, 0, 960, 640, 'trees2').setOrigin(0, 0);

        this.add.image(0, 0, 'bar').setOrigin(0, 0);
        

        // health display
        healthDisplay = this.add.text(borderUISize + borderPadding * 32.5 + 250, borderUISize + borderPadding * 2 - 36, "Health: " + health, healthConfig);  

        // dragon
        // const p1 = this.add.sprite(100, 100, 'dragon2', 0);
        // this.anims.create({
        //     key: 'fly',
        //     repeat: -1,
        //     frameRate: 12,
        //     frames: this.anims.generateFrameNames('dragon2', {start: 1, end: 5}) 
        // });
        //  p1.play('fly');

        // adds Dragon to the Game
        this.p1 = new Dragon(this, 100, game.config.height - borderUISize - borderPadding - 30, 'dragon2' , false).setOrigin(0.5, 0);

        // adds Food to the Game
        // initial random food
        var random1 = Phaser.Math.Between(100, 150);
        var random2 = Phaser.Math.Between(250, 300);
        var random3 = Phaser.Math.Between(350, 450);
        var random4 = Phaser.Math.Between(500, 600);

        this.food1 = new Food(this, 800, random1, 'food', false).setOrigin(0.5, 0);
        this.food2 = new Food(this, 800, random2, 'food', false).setOrigin(0.5, 0);
        this.food3 = new Food(this, 800, random3, 'food', false).setOrigin(0.5, 0);
        this.poison = new Food(this, 800, 100, 'bomb', false).setOrigin(0.5, 0);

        

        let minusTime = setInterval(updateTime, 1000);

        function updateTime(){
            console.log("In here");
            if(time > 0){
                time--;
            }
        }

        minushealth = setInterval(mhealth, 1000);

        function mhealth(){
            console.log("In here");
            if(health > 0){
                health-= 10;
            }
            healthDisplay.text = "Health:  " + health;
        }

        let meterDisplay;
        let meter = 0; 
        let count = 0;
        let meterspeed = 100;

        let meterConfig = {
           fontFamily: 'Courier',
           fontSize: '20px',
           backgroundColor: '#c62426',
           color: '#ffffff',
           align: 'center',
           padding:{
               top: 5,
               bottom: 5,
           },
           fixedWidth: 0
       }
       
       meterDisplay = this.add.text(borderUISize + borderPadding * 23 + 32, borderUISize + borderPadding - 20, "METERS: " + meter, meterConfig);   

       let minusmeter = setInterval(updatemeter, meterspeed);
       
       function updatemeter(){
           count = count + 1;
           if (health <= 0){
               clearInterval(minusmeter);
           }
           if (count % 5 == 0) {
                speed();
                count = 0;
            }

           if(meter >= 0){
               meter++;
           }
           meterDisplay.text = "METERS: " + meter;
       }

        function speed() {
            meterspeed -= 100;
        }

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }

    update(){

        if(time == 0 && made == false){
            var random5 = Phaser.Math.Between(100, 300);
            var random6 = Phaser.Math.Between(300, 600);
            this.poison2 = new Food(this, 1000, random5, 'bomb', false).setOrigin(0.5, 0);
            this.poison3 = new Food(this, 1000, random6, 'bomb', false).setOrigin(0.5, 0);
            made = true;
        }

        if(made == true){
            this.poison2.update();
            this.poison3.update();
            this.poison2.moveSpeed = 24;
            this.poison3.moveSpeed = 24;

            if(this.checkCollision(this.p1, this.poison2)) {
                this.sound.play("hurt");
                if (health>= 100){
                    health = 100;
                    healthDisplay.text = "Health: " + health;
                }
                if (health > 0) {
                    health -= 5;
                    healthDisplay.text = "Health: " + health;

                }else{
                    console.log("GameOver");
                    health = 0;
                    healthDisplay.text = "Health: " + health;
                    this.game.sound.stopAll();
                    this.add.image(0, 0, 'fin').setOrigin(0, 0);
                    clearInterval(minushealth);
                    if (Phaser.Input.Keyboard.JustDown(keyR)) {
                        health = 100;
                        this.scene.restart();
                    }
                    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        health = 100;
                        this.scene.start("titleScene");
                    }
                    //this.scene.start("overScene");
                }
                this.poison2.reset();
            }

            if(this.checkCollision(this.p1, this.poison3)) {
                this.sound.play("hurt");
                if (health>= 100){
                    health = 100;
                    healthDisplay.text = "Health: " + health;
                }
                if (health > 0) {
                    health -= 5;
                    healthDisplay.text = "Health: " + health;

                }else{
                    console.log("GameOver");
                    health = 0;
                    healthDisplay.text = "Health: " + health;
                    this.game.sound.stopAll();
                    this.add.image(0, 0, 'fin').setOrigin(0, 0);
                    clearInterval(minushealth);
                    if (Phaser.Input.Keyboard.JustDown(keyR)) {
                        health = 100;
                        this.scene.restart();
                    }
                    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        health = 100;
                        this.scene.start("titleScene");
                    }
                    //this.scene.start("overScene");
                }
                this.poison3.reset();
            }
        }

        this.clouds.tilePositionX += 1.25;
        this.mountains.tilePositionX += 1;
        this.trees1.tilePositionX += 1.5;
        this.trees2.tilePositionX += 2;

        this.p1.update();
        this.food1.update();
        this.food2.update();
        this.food3.update();
        this.poison.update();

        if (health <= 0){
            console.log("GameOver");
            health = 0;
            healthDisplay.text = "Health: " + health;
            this.game.sound.stopAll();
            this.add.image(0, 0, 'fin').setOrigin(0, 0);
            clearInterval(minushealth);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                health = 100;
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                health = 100;
                this.scene.start("titleScene");
            }
            //this.scene.start("overScene");
        }

        //this.p1.y = game.input.mousePointer.y;
        
        if(this.checkCollision(this.p1, this.food1)) {
            this.sound.play("eat");
            if (health>= 100){
                health = 100;
                healthDisplay.text = "Health: " + health;
            }
            if (health > 0) {
                health += 5;
                healthDisplay.text = "Health: " + health;

            }else{
                console.log("GameOver");
                health = 0;
                healthDisplay.text = "Health: " + health;
                this.game.sound.stopAll();
                this.add.image(0, 0, 'fin').setOrigin(0, 0);
                clearInterval(minushealth);
                if (Phaser.Input.Keyboard.JustDown(keyR)) {
                    health = 100;
                    this.scene.restart();
                }
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    health = 100;
                    this.scene.start("titleScene");
                }
                //this.scene.start("overScene");
            }
            this.food1.reset();
        }

        if(this.checkCollision(this.p1, this.food2)) {
            this.sound.play("eat");
            if (health>= 100){
                health = 100;
                healthDisplay.text = "Health: " + health;
            }
            if (health > 0) {
                health += 5;
                healthDisplay.text = "Health: " + health;

            }else{
                console.log("GameOver");
                health = 0;
                healthDisplay.text = "Health: " + health;
                this.game.sound.stopAll();
                this.add.image(0, 0, 'fin').setOrigin(0, 0);
                clearInterval(minushealth);
                if (Phaser.Input.Keyboard.JustDown(keyR)) {
                    health = 100;
                    this.scene.restart();
                }
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    health = 100;
                    this.scene.start("titleScene");
                }
                //this.scene.start("overScene");
            }
            this.food2.reset();
        }

        if(this.checkCollision(this.p1, this.food3)) {
            this.sound.play("eat");
            if (health>= 100){
                health = 100;
                healthDisplay.text = "Health: " + health;
            }

            if (health > 0) {
                health += 5;
                healthDisplay.text = "Health: " + health;

            }else{
                console.log("GameOver");
                health = 0;
                healthDisplay.text = "Health: " + health;
                this.game.sound.stopAll();
                this.add.image(0, 0, 'fin').setOrigin(0, 0);
                clearInterval(minushealth);
                if (Phaser.Input.Keyboard.JustDown(keyR)) {
                    health = 100;
                    this.scene.restart();
                }
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    health = 100;
                    this.scene.start("titleScene");
                }
                //this.scene.start("overScene");
            }
            this.food3.reset();
        }

        if(this.checkCollision(this.p1, this.poison)) {
            this.sound.play("hurt");
            if (health>= 100){
                health = 100;
                healthDisplay.text = "Health: " + health;
            }
            if (health > 0) {
                health -= 5;
                healthDisplay.text = "Health: " + health;

            }else{
                console.log("GameOver");
                health = 0;
                healthDisplay.text = "Health: " + health;
                this.game.sound.stopAll();
                this.add.image(0, 0, 'fin').setOrigin(0, 0);
                clearInterval(minushealth);
                if (Phaser.Input.Keyboard.JustDown(keyR)) {
                    health = 100;
                    this.scene.restart();
                }
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    health = 100;
                    this.scene.start("titleScene");
                }
                //this.scene.start("overScene");
            }
            this.poison.reset();
        }
    }

    // checking collision

    checkCollision(dragon, food) {
        // simple AABB checking
        if( dragon.x < food.x + food.width &&
            dragon.x + dragon.width > food.x &&
            dragon.y < food.y + food.height &&
            dragon.height + dragon.y > food.y) {
                return true;
        } else {
            return false;
        }
    }

    // dragonFly(dragon){
    //     //dragon.sprite.play('fly', true);
    // }

}