class Coins extends MovableObject {
    y = 20;
    width = 100;
    height = 100;

    offset = {
        top: 25,
        left: 25,
        right: 25,
        bottom: 25
    };

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * 1700;
        this.y = Math.random() * 320;
    }
}