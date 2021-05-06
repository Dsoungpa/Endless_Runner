// Names: Luis Garcia, Dylan Soungpanya, Bemister Tessema
// Game Title: Dragon Speed
// Date Completed: 5/5/2021
// Creative Tilt: We implemented programming that allows the player to hit something and either gain
// or lose health. We implemented how to randomly spawn these items within certain boundaries and we were able
// to make 2 different items that affect the player's health variable. We also implemented a timer within the game 
// that increases amount of "bombs" spawned depending how far the player makes it. 
// We decided to go with pixel art for our visuals and we went with a medieval theme which we think goes nice
// with the player's character which is a dragon.

// keep me honest
'use strict';
let health = 100;
let healthDisplay;
let healthConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    backgroundColor: '#c62426',
    color: '#FFFFFF',
    align: 'right',
    padding:{
        top: 5,
        bottom: 5,
    },
    fixedWidth: 130
}
        
    
// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, HowToPlay, GameOver, Over ]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define globals
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let paddle = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 150;
let level;
let highScore;
let keyLEFT;
let keyRIGHT;
let newHighScore = false;
let cursors;
let time = 15;
let made = false;
let over = false;
let keyR;
let keySPACE;
let minushealth;