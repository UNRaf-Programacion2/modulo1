
/* MainScene */
export default class MainScene extends Phaser . Scene {
    constructor () {
        super ({ key: 'MainScene' })
    }
    create () {
        let dude = new Dude ( this , 250 , 50 )
        }
    }

/* Dude Class */
class Dude extends Phaser.Physics.Arcade.Sprite {
    healthBar
    constructor ( scene , x = 0 , y = 0 , texture = 'dude' ) {
        super ( scene , x , y , texture )
        scene.add.existing ( this )
        scene.physics.add.existing ( this )
        scene.events.on ( 'update' , this.update , this )
        this.healthBar = new HealthBar ( scene )
        }
    update () {
        
        this.healthBar.follow ( this )
        
        }
    }
    

/* HealthBar Class */
class HealthBar extends Phaser . GameObjects . Sprite {
    value 
    constructor ( scene , x = 0 , y = 0 , texture = 'healthBar' ) {
        super ( scene , x , y , texture )
        scene.add.existing ( this )
        }
    follow ( dude ) {
        this.setX ( dude.x )
        this.setY ( dude.y - 50 )
        }
}