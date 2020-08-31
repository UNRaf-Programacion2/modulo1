import HealthBar from './HealthBar.js';
import {getGreen, getBlue} from '../utils.js';

class Elf extends Phaser.GameObjects.Sprite {

    constructor (scene, color, x, y)
    {
        super(scene, x, y);

        this.color = color;

        this.setTexture('elves');
        this.setPosition(x, y);

        this.play(this.color + 'Idle');

        scene.add.existing(this);

        this.on('animationcomplete', this.animComplete, this);

        this.alive = true;

        var hx = (this.color === 'blue') ? 110 : -40;

        this.hp = new HealthBar(scene, x - hx, y - 110);

        this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }

    animComplete (animation)
    {
        if (animation.key === this.color + 'Attack')
        {
            this.play(this.color + 'Idle');
        }
    }

    damage (amount)
    {
        if (this.hp.decrease(amount))
        {
            this.alive = false;

            this.play(this.color + 'Dead');

            (this.color === 'blue') ? bluesAlive-- : greensAlive--;
        }
    }

    fire ()
    {
        var target = (this.color === 'blue') ? getGreen() : getBlue();

        if (target && this.alive)
        {
            this.play(this.color + 'Attack');

            var offset = (this.color === 'blue') ? 20 : -20;
            var targetX = (this.color === 'blue') ? target.x + 30 : target.x - 30;

            this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

            this.scene.tweens.add({
                targets: this.missile,
                x: targetX,
                ease: 'Linear',
                duration: 500,
                onComplete: function (tween, targets) {
                    targets[0].setVisible(false);
                }
            });

            target.damage(Phaser.Math.Between(2, 8));

            this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
        }
    }

}

export default Elf;