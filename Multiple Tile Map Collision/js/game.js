var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    //la importante es la primera, que es la que arranca
    scene: [tilemap]
};

var game = new Phaser.Game(config);

var map;
var cursors;
var debugGraphics;
var text;
var player;
var showDebug = false;
var groundLayer;

var coinsLayer;
var tomatosLayer;

var coinsCollected = 0;
var tomatosCollected = 0;