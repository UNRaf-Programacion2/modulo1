import test from './test.js';
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    /*physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },*/
    //la importante es la primera, que es la que arranca
    scene: [test]
};



var game = new Phaser.Game(config);

