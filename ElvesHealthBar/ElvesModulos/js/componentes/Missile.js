class Missile extends Phaser.GameObjects.Image {

    constructor (scene, frame)
    {
        super(scene, 0, 0, 'elves', frame);

        this.visible = false;
    }

}

export default Missile;