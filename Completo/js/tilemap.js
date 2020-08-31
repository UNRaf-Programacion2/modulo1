class tilemap extends Phaser.Scene {
    constructor() {
        super('tilemap');
    }

    preload() {
        this.load.image('ground', 'assets/tilemaps/tiles/kenny_ground_64x64.png');
        this.load.image('items', 'assets/tilemaps/tiles/kenny_items_64x64.png');
        this.load.image('platformer', 'assets/tilemaps/tiles/kenny_platformer_64x64.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/multi-tileset-v12.json');

        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        var map = this.make.tilemap({ key: 'map' });

        var groundTiles = map.addTilesetImage('kenny_ground_64x64', 'ground');
        var itemTiles = map.addTilesetImage('kenny_items_64x64', 'items');
        var platformTiles = map.addTilesetImage('kenny_platformer_64x64', 'platformer');

        //  To use multiple tilesets in a single layer, pass them in an array like this:
        var tile_layer = map.createDynamicLayer('Tile Layer 1', [groundTiles, itemTiles, platformTiles]);
        tile_layer.setCollisionByExclusion([-1]);
        
        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        player = this.physics.add.sprite(100, 0, 'dude');


        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cameras.main.startFollow(player);

        this.cameras.main.followOffset.set(-300, 0);


        //  Input Events
        if (cursors = !undefined) {
            cursors = this.input.keyboard.createCursorKeys();
        }
      
        this.physics.add.collider(player, tile_layer);
        
    }

    update(time, delta) {
        //controls.update(delta);

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-330);
        }
    }

}