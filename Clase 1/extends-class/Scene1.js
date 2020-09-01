class Scene1 extends Phaser.Scene {
    constructor() {
      super('Scene1');
    }

    preload ()
    {
      this.load.image('bomb', 'assets/bomb.png');         
      this.load.image('tomato', 'assets/tomato.png'); 
    }

    create() {
      //let bomb = new Bomb({ scene:this,
      //                      x:100,
      //                      y:100,
      //                      sprite: "bomb"});

      //let tomato = new Bomb({ scene:this,
      //                      x:game.config.width/2,
      //                      y:game.config.height/2,
      //                      sprite: "tomato"});

      for (var i = 0; i < 100; i++) {
        let xx=Phaser.Math.Between(0,game.config.width);
        let yy=Phaser.Math.Between(0,game.config.height);
        if (i % 2 == 0) {
          let bomb=new Bomb({scene:this,x:xx,y:yy, sprite: "bomb"})
        }
        else
        {
          let bomb=new Bomb({scene:this,x:xx,y:yy, sprite: "tomato"})
        }
      }
    }
}
