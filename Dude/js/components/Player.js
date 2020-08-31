class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, sprite) {

        super(scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.events.on('update', this.update, this);

        this.salud = new HealthBar(scene, x, y - 50);

        this.poder = new HealthBar(scene, x, y - 100, 60, 0, 0x00ff00);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }

    update() {
        this.salud.follow(this);
        this.poder.follow(this);
    }
}