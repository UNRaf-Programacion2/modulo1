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

var blues = [];
var greens = [];

var bluesAlive = 4;
var greensAlive = 4;

var game = new Phaser.Game(config);

function getGreen() {
    if (greensAlive) {
        greens = Phaser.Utils.Array.Shuffle(greens);

        for (var i = 0; i < greens.length; i++) {
            if (greens[i].alive) {
                return greens[i];
            }
        }
    }

    return false;
}

function getBlue() {
    if (bluesAlive) {
        blues = Phaser.Utils.Array.Shuffle(blues);

        for (var i = 0; i < blues.length; i++) {
            if (blues[i].alive) {
                return blues[i];
            }
        }
    }

    return false;
}