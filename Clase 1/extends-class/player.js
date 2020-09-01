class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "player");
        config.scene.add.existing(this);
    }
}