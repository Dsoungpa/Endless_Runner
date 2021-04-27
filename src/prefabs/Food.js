class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.moveSpeed = 3;
    }

    update() {
        // move food to the left
        this.x -= this.moveSpeed;
        
        // checks when food has passed the left side
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position resets random
    reset() {
        this.x = game.config.width;
        var random = Phaser.Math.Between(1, 600);
        this.y = random;
    }
}