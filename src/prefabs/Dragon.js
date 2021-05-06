class Dragon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.health = 100;
    }

    preload(){
        // load player
        //this.load.image('dragon', './assets/img/Dragon.png');
    }

    create(){
        
    }

    update(){
        //game.physics.arcade.moveToPointer(sprite, 400);
        this.y = game.input.mousePointer.y;
    }
    
}