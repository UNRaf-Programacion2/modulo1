var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 10 },
      debug: false,
    },
  },
  scene: [MainScene],
};

var game = new Phaser.Game(config);
