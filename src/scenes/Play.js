class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    

    preload(){
        // load player
        this.load.image('dragon', './assets/img/Dragon.png');
        // load food
        this.load.image('food', './assets/img/DaBabyCar2.png');
        this.load.image('sky', './assets/img/Sky.png');
        this.load.image('clouds', './assets/img/Clouds.png');
        this.load.image('mountains', './assets/img/Mountains.png');
        this.load.image('trees1', './assets/img/Trees1.png');
        this.load.image('trees2', './assets/img/Trees2.png');
        this.load.image('bar', './assets/img/HealthBar.png');
        //load dragon
        this.load.spritesheet('dragon2', './assets/img/DragonSprite.png', {frameWidth: 75, frameHeight: 66, startFrame: 1, endFrame: 5});
    }

    create(){

        //parallax background this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.sky = this.add.tileSprite(0, 0, 960, 640, 'sky').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 960, 640, 'clouds').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, 0, 960, 640, 'mountains').setOrigin(0, 0);
        this.trees1 = this.add.tileSprite(0, 0, 960, 640, 'trees1').setOrigin(0, 0);
        this.trees2 = this.add.tileSprite(0, 0, 960, 640, 'trees2').setOrigin(0, 0);

        this.add.image(0, 0, 'bar').setOrigin(0, 0)

        // health display
        healthDisplay = this.add.text(borderUISize + borderPadding * 32.5 - 100, borderUISize + borderPadding * 2 - 50, "Health: " + health, healthConfig);  

        // dragon
        const player1 = this.add.sprite(100, 100, 'dragon2', 0);
        this.anims.create({
            key: 'fly',
            repeat: -1,
            frameRate: 12,
            frames: this.anims.generateFrameNames('dragon2', {start: 1, end: 5}) 
        });
        player1.play('fly');

        // adds Dragon to the Game
        this.p1 = new Dragon(this, 100, game.config.height - borderUISize - borderPadding - 30, 'dragon2' , false).setOrigin(0.5, 0);

        // adds Food to the Game
        // initial random food
        var random = Phaser.Math.Between(1, 600);
        this.food1 = new Food(this, 800, random, 'food', false).setOrigin(0.5, 0);

         

        let minushealth = setInterval(mhealth, 1000);

        function mhealth(){
            console.log("In here");
            if(health > 0){
                health-= 10;
            }
            healthDisplay.text = "Health:  " + health;
        }
    }

    update(){
        
        //background movement
        this.clouds.tilePositionX += 1.25;
        this.mountains.tilePositionX += 1;
        this.trees1.tilePositionX += 1.5;
        this.trees2.tilePositionX += 2;

        this.p1.update();
        this.food1.update();

        if(this.checkCollision(this.p1, this.food1)) {
            if (health > 0) {
                health += 5;
                healthDisplay.text = "Health: " + health;

            }
            this.food1.reset();
            //play dragon eating animation
            console.log("collided");
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

}