class HealthBar {
    constructor(scene, x, y, offset = 40 ,inicio = 100, color = 0x00FF00FF) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.offset = offset;
        this.value = inicio;
        this.p = 76 / 100;
        this.fillColor = color;
        this.draw();      
        scene.add.existing(this.bar);
    }

    decrease(amount) {
        this.value -= amount;
        if (this.value < 0) {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }

    increase(amount) {
        this.value += amount;
        if (this.value > 100) {
            this.value = 0;
            console.log('Supero todo');
        }
        this.draw();
        return (this.value === 0);
    }

    follow(player) {
        this.draw(player.x, player.y - this.offset);
    }

    draw(x = null, y = null) {
        x = (x === null) ? this.x : x;
        y = (y === null) ? this.y : y;
        this.x = x;
        this.y = y;
        this.bar.clear();
        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(x, y, 80, 16);
        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(x + 2, y + 2, 76, 12);
        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(this.fillColor);
        }
        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(x + 2, y + 2, d, 12);
    }

}