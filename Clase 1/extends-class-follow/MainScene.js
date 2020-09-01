class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload(){
    this.load.image('bomb', 'assets/bomb.png');         
    this.load.image('tomato', 'assets/tomato.png');
  }

  create() {
    let dude = new Dude(this, 250, 50);
  }
}
