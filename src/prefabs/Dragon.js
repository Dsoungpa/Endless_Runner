class Dragon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.health = 100;
    }

    update(){
        this.y = game.input.mousePointer.y;
    }
}