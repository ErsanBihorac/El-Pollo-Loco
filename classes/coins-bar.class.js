class Coinsbar extends DrawableObject {
    coins = 0;
    coin_sound = new Audio('audio/coin.mp3');

    COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    /**
     * this function sets the percentage for the coins bar
     * @param {number} coins - is the current percentage (coins) of the character that's available
     */
    setCoins(coins) {
        this.coins = coins;
        let path = this.COIN_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function selects the correct image that displays the coins bar
     * @returns - the function returns the number of the location in the array for the correct image
     */
    resolveImageIndex() {
        if (this.coins == 100) {
            return 5;
        } else if (this.coins == 80) {
            return 4;
        } else if (this.coins == 60) {
            return 3;
        } else if (this.coins == 40) {
            return 2;
        } else if (this.coins == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}