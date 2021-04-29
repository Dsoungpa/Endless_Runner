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
        this.food1 = new Food(this, 800, random, 'food', false).setOrigin(0.5, 0);

        // health display

        
        
         
         
        
        healthDisplay = this.add.text(borderUISize + borderPadding * 32.5, borderUISize + borderPadding*2, "Health: " + health, healthConfig);   

        let minushealth = setInterval(mhealth, 1000);

        function mhealth(){
            console.log("In here");
            if(health > 0){
                health-= 10;
            }
            healthDisplay.text = "Health: " + health;
        }

        
        
    }

    update(){
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