class HealthBar extends Phaser.GameObjects.Sprite {
  constructor(scene, x = 0, y = 0, texture = "tomato") {
    super(scene, x, y, texture);
    scene.add.existing(this);
  }
  follow(dude) {
    this.setX(dude.x);
    this.setY(dude.y - 50);
  }
}
