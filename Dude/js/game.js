var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    //la importante es la primera, que es la que arranca
    scene: [Scene1, Scene3, Scene2]
};

var game = new Phaser.Game(config);

var score;
var gameOver;

var player;
var stars;
var stars2;
var bombs;
var platforms;
var cursors;
var scoreText;
var dudeStateText;

var timedEvent;
var initialTime;
var timeText;

var patron;

var hongo;