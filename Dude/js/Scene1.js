class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      //se PUEDEN cargar los recursos de esta misma escena o de cualquier otra
      
      //solo esta se usa en scene1
      this.load.image('logo', 'assets/logo.png');

      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });    
      this.load.image("star2", "assets/star2.png")  
      
      //this.load.image('mushroom', 'assets/mushroom.png');
      this.load.image('tomato', 'assets/tomato.png'); 
      this.load.image('carrot', 'assets/carrot.png');      
    }

    create() {

      //  Our player animations, turning, walking left and walking right.
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      var logo = this.add.image(400, 300, 'logo').setScale(0.26)
      
      // () =>
      // funciones flecha
      
      logo.setInteractive()
      logo.on('pointerdown', () => {  console.log('iniciando juego');
                                      this.scene.start('juego');
                                    } );

      // Funcion FLECHA
      // (param1, param2, …, paramN) => { sentencias }
      // (param1, param2, …, paramN) => expresion
      // Equivalente a: () => { return expresion; }
    }
}
