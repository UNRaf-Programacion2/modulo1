class BlueElf extends Elf {

    constructor (scene, x, y)
    {
        super(scene, 'blue', x, y);

        this.missile = new Missile(scene, 'blue-missile');

        scene.add.existing(this.missile);
    }

}