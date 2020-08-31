class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }

    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        platforms.create(50, 350, 'ground');
        // The player and its settings
        player = new Player( this, 100, 450, 'dude');
        //  Input Events
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }
            

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars2 = this.physics.add.group({
            key: 'star2',
            repeat: 5,
            setXY: { x: 5, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            
            child.x += Phaser.Math.FloatBetween(-15, 15);            

            patron = Phaser.Math.FloatBetween(0, 1);
            child.score = 10;
        });

        stars2.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
            
            child.x += Phaser.Math.FloatBetween(-15, 20);            

            patron = Phaser.Math.FloatBetween(0, 1);
    
            child.score = 15;
            
        
        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(100, 16, 'score: 0', { fontSize: '40px', fill: '#0D1992', fontFamily: "Times New Roman" });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(stars2, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, stars2, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Inicializacion de variables.
        score = 0;
        gameOver = false;

        // Si no junta las estrellas en 30 segundas --> Game Over
        initialTime = 30
        //timedEvent = this.time.delayedCall(1000, this.onSecond, [], this, true);
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(500, 16, '', { fontSize: '32px', fill: '#000' });

        this.jumps = 0;


        // Interactive dude
        player.setInteractive();
        this.input.setDraggable(player);
    
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0x0000ff);            
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();

            //Deshabilitar inputs
            //player.input.enabled = false;
            //player.input.draggable = false;
            //gameObject.disableInteractive();            
        });


        dudeStateText = this.add.text(16, 550, '', { fontSize: '32px', fill: '#000' });
        player.on('pointerover', function () {
            dudeStateText.setText('Puntero en Player'); 
        });
        player.on('pointerout', function () {            
            dudeStateText.setText('Puntero fuera de Player');
        });
        
    }


        

    update ()
    {
        if (gameOver)
        {       
            return
        }
        
        
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        score += star.score //10;
        scoreText.setText('Score: ' + score);

        player.poder.increase(star.score);



        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });
            stars2.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            initialTime = 30

        }


    }


    hitBomb (player, bomb)
    {
        //this.gameOver()
        player.salud.decrease(34);
        if(player.salud.value <= 0){
            this.gameOver();
        }
    }


    gameOver() {        
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Times New Roman', fontSize: 80, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos'));
        
        //var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' })
        //gameOverButton.setInteractive()
        ///gameOverButton.on('pointerdown', () => this.scene.start('creditos'));        
        
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(200, 300, 200, 300)); 
        
        timedEvent.paused = true;
    }
    
    onSecond() {
        initialTime = initialTime - 1; // One second
        if (initialTime == 0) {
            
            this.gameOver()
        }
        
    }



}