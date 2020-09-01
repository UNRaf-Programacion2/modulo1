class tilemap extends Phaser.Scene {
    constructor() {
        super('tilemap');
    }

    preload() {
        this.load.image('ground_1x1'    , '../assets/tilemaps/tiles/ground_1x1.png');
        
        this.load.spritesheet('coin'    , '../assets/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tomato'        , '../assets/tomato.png', { frameWidth: 18, frameHeight: 17 });

        this.load.tilemapTiledJSON('map', '../assets/tilemaps/maps/tile-collision.json');
        this.load.image('player'        , '../assets/phaser-dude.png');
    }

    create() {
        map = this.make.tilemap({ key: 'map' });
        var groundTiles = map.addTilesetImage('ground_1x1');
        
        var coinTiles = map.addTilesetImage('coin');
        var tomatoTiles = map.addTilesetImage('tomato');

        map.createDynamicLayer('Background Layer', groundTiles, 0, 0);
        groundLayer  = map.createDynamicLayer('Ground Layer', groundTiles, 0, 0);        
            
        coinsLayer   = map.createDynamicLayer('Coins Layer', coinTiles, 0, 0);        
        tomatosLayer = map.createDynamicLayer('Tomatos Layer', tomatoTiles, 0, 0);        

        groundLayer.setCollisionBetween(1, 25);
    
        // This will set Tile ID 26 (the coin tile) to call the function "hitCoin" when collided with
        coinsLayer.setTileIndexCallback(26, this.hitCoin, this);
        
        // This will set Tile ID 32 (the tomato tile) to call the function "hitTomato" when collided with
        tomatosLayer.setTileIndexCallback(32, this.hitTomato, this);
    
        // This will set the map location (2, 0) to call the function "hitSecretDoor" Un-comment this to
        // be jump through the ceiling above where the player spawns. You can use this to create a
        // secret area.
        groundLayer.setTileLocationCallback(2, 0, 1, 1, this.hitSecretDoor, this);
    
        player = this.physics.add.sprite(80, 70, 'player')
            .setBounce(0.1);
    
        // We want the player to physically collide with the ground, but the coin and tomato layer should only
        // trigger an overlap so that collection a coin doesn'td kill player movement.
        this.physics.add.collider(player, groundLayer);        
        this.physics.add.overlap(player, coinsLayer);
        this.physics.add.overlap(player, tomatosLayer);

    

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);

    
        cursors = this.input.keyboard.createCursorKeys();
    
        text = this.add.text(16, 16, '', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        text.setScrollFactor(0);
        this.updateText();
        
    }

    update (time, delta)
    {
        // Horizontal movement
        player.body.setVelocityX(0);
        if (cursors.left.isDown)
        {
            player.body.setVelocityX(-200);
        }
        else if (cursors.right.isDown)
        {
            player.body.setVelocityX(200);
        }
    
        // Jumping
        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
        {
            player.body.setVelocityY(-300);
        }
    }


    hitCoin (sprite, tile)
    {
        console.log('Entro a monedas')
        coinsLayer.removeTileAt(tile.x, tile.y);
        coinsCollected += 1;
        this.updateText();

        // Return true to exit processing collision of this tile vs the sprite - in this case, it
        // doesn't matter since the coin tiles are not set to collide.
        return true;
    }

    hitTomato (sprite, tile)
    {
        console.log('Entro a tomates')
        tomatosLayer.removeTileAt(tile.x, tile.y);
        tomatosCollected += 1;
        this.updateText();

        // Return true to exit processing collision of this tile vs the sprite - in this case, it
        // doesn't matter since the coin tiles are not set to collide.
        return true;
    }

    hitSecretDoor (sprite, tile)
    {
        tile.alpha = 0.25;

        // Return true to exit processing collision of this tile vs the sprite - here, we want to allow
        // the player jump "through" the block and not collide.
        return true;
    }

    updateText ()
    {
        text.setText(
            'Arrow keys to move. Space to jump' +            
            '\nCoins collected: ' + coinsCollected +
            '\nTomatos collected: ' + tomatosCollected
        );
    }
   

}