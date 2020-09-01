class Dude extends Phaser.Physics.Arcade.Sprite {
  healthBar;
  constructor(scene, x = 0, y = 0, texture = "bomb") {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.events.on("update", this.update, this);
    this.healthBar = new HealthBar(scene);
  }
  update() {
    this.healthBar.follow(this);
  }
}
