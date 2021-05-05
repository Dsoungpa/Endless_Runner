class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.moveSpeed = 20;
        this.count = 0;
    }

    create() {
        
    }

    update() {
        // move food to the left
        this.x -= this.moveSpeed;
        
        // checks when food has passed the left side
        if(this.x <= 0 - this.width) {
            this.reset();
        }
        
        //let It = this.time.delayedCall(3000, speed(), [], this);
    }

    speed() {
        if (this.moveSpeed <= 24){
            this.moveSpeed += 2;
        }
        
    }

    // position resets random
    reset() {
        this.x = game.config.width;
        var random = Phaser.Math.Between(100, 600);
        this.y = random;
        
        this.count = this.count + 1;

        if (this.count % 5 == 0) {
            this.speed();
            this.count = 0;
        }
    }

    
}