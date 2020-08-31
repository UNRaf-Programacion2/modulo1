class GreenElf extends Elf {

    constructor (scene, x, y)
    {
        super(scene, 'green', x, y);

        this.missile = new Missile(scene, 'green-missile');

        scene.add.existing(this.missile);
    }

}