class Bomb extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.sprite);
        config.scene.add.existing(this);

        this.setInteractive();
        this.on('pointerdown',this.clickMe,this);
    }

    clickMe()
    {
    	this.alpha-=.1;
    }
}