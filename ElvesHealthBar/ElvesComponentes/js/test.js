class test extends Phaser.Scene {
    constructor() {
        super('test');
    }

    preload() {
        this.load.image('background', 'assets/pics/fairy-background-craft-pixel.png');
        this.load.atlas('elves', 'assets/animations/elves-craft-pixel.png', 'assets/animations/elves-craft-pixel.json');
    }

    create() {
        this.anims.create({ key: 'greenIdle', frames: this.anims.generateFrameNames('elves', { prefix: 'green_idle_', start: 0, end: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'blueIdle', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_idle_', start: 0, end: 4 }), frameRate: 10, repeat: -1 });

        this.anims.create({ key: 'greenAttack', frames: this.anims.generateFrameNames('elves', { prefix: 'green_attack_', start: 0, end: 5 }), frameRate: 10 });
        this.anims.create({ key: 'blueAttack', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_attack_', start: 0, end: 4 }), frameRate: 10 });

        this.anims.create({ key: 'greenDead', frames: this.anims.generateFrameNames('elves', { prefix: 'green_die_', start: 0, end: 4 }), frameRate: 6 });
        this.anims.create({ key: 'blueDead', frames: this.anims.generateFrameNames('elves', { prefix: 'blue_die_', start: 0, end: 4 }), frameRate: 6 });

        this.add.image(0, 0, 'background').setOrigin(0);

        blues.push(new BlueElf(this, 120, 476));
        blues.push(new BlueElf(this, 220, 480));
        blues.push(new BlueElf(this, 320, 484));
        blues.push(new BlueElf(this, 440, 480));

        greens.push(new GreenElf(this, 560, 486));
        greens.push(new GreenElf(this, 670, 488));
        greens.push(new GreenElf(this, 780, 485));
        greens.push(new GreenElf(this, 890, 484));
    }

    
}