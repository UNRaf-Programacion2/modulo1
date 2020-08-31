export function getGreen() {
    if (greensAlive) {
        greens = Phaser.Utils.Array.Shuffle(greens);

        for (var i = 0; i < greens.length; i++) {
            if (greens[i].alive) {
                return greens[i];
            }
        }
    }

    return false;
}

export function getBlue() {
    if (bluesAlive) {
        blues = Phaser.Utils.Array.Shuffle(blues);

        for (var i = 0; i < blues.length; i++) {
            if (blues[i].alive) {
                return blues[i];
            }
        }
    }

    return false;
}