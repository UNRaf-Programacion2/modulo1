import Elf  from './Elf.js';
import Missile from './Missile.js';

class BlueElf extends Elf {

    constructor (scene, x, y)
    {
        super(scene, 'blue', x, y);

        this.missile = new Missile(scene, 'blue-missile');

        scene.add.existing(this.missile);
    }

}

export default BlueElf;